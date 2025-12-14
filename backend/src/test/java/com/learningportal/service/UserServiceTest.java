package com.learningportal.service;

import com.learningportal.TestBase;
import com.learningportal.TestDataFactory;
import com.learningportal.dto.RegisterRequest;
import com.learningportal.entity.User;
import com.learningportal.exception.ResourceNotFoundException;
import com.learningportal.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Unit tests for UserService.
 * 
 * Tests business logic in isolation using mocks.
 * Follows Given-When-Then pattern for clarity.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Unit Tests")
class UserServiceTest extends TestBase {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private RegisterRequest registerRequest;

    @BeforeEach
    public void setUp() {
        super.setUp();
        setupTestData();
    }

    @Override
    protected void setupTestData() {
        testUser = TestDataFactory.createUserWithId(1L, "testuser", "test@example.com");
        registerRequest = new RegisterRequest();
        registerRequest.setUsername("newuser");
        registerRequest.setEmail("newuser@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setFullName("New User");
    }

    @Test
    @DisplayName("getUserByUsername - User exists - Returns user")
    void testGetUserByUsername_UserExists_ReturnsUser() {
        // Given
        String username = "testuser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(testUser));

        // When
        User result = userService.getUserByUsername(username);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(username);
        verify(userRepository).findByUsername(username);
    }

    @Test
    @DisplayName("getUserByUsername - User not found - Throws exception")
    void testGetUserByUsername_UserNotFound_ThrowsException() {
        // Given
        String username = "nonexistent";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> userService.getUserByUsername(username))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User not found");
        verify(userRepository).findByUsername(username);
    }

    @Test
    @DisplayName("registerUser - Valid request - Creates user")
    void testRegisterUser_ValidRequest_CreatesUser() {
        // Given
        String encodedPassword = "$2a$10$encodedpassword";
        when(passwordEncoder.encode(anyString())).thenReturn(encodedPassword);
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });

        // When
        User result = userService.registerUser(registerRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(registerRequest.getUsername());
        assertThat(result.getEmail()).isEqualTo(registerRequest.getEmail());
        assertThat(result.getPasswordHash()).isEqualTo(encodedPassword);
        verify(passwordEncoder).encode(registerRequest.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("registerUser - Username exists - Throws exception")
    void testRegisterUser_UsernameExists_ThrowsException() {
        // Given
        when(userRepository.existsByUsername(registerRequest.getUsername())).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> userService.registerUser(registerRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Username already taken");
        verify(userRepository).existsByUsername(registerRequest.getUsername());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("registerUser - Email exists - Throws exception")
    void testRegisterUser_EmailExists_ThrowsException() {
        // Given
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> userService.registerUser(registerRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Email already registered");
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("validatePassword - Correct password - Returns true")
    void testValidatePassword_CorrectPassword_ReturnsTrue() {
        // Given
        String rawPassword = "password123";
        when(passwordEncoder.matches(rawPassword, testUser.getPasswordHash())).thenReturn(true);

        // When
        boolean result = userService.validatePassword(testUser, rawPassword);

        // Then
        assertThat(result).isTrue();
        verify(passwordEncoder).matches(rawPassword, testUser.getPasswordHash());
    }

    @Test
    @DisplayName("validatePassword - Incorrect password - Returns false")
    void testValidatePassword_IncorrectPassword_ReturnsFalse() {
        // Given
        String rawPassword = "wrongpassword";
        when(passwordEncoder.matches(rawPassword, testUser.getPasswordHash())).thenReturn(false);

        // When
        boolean result = userService.validatePassword(testUser, rawPassword);

        // Then
        assertThat(result).isFalse();
        verify(passwordEncoder).matches(rawPassword, testUser.getPasswordHash());
    }
}
