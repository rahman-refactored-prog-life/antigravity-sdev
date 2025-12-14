package com.learningportal;

import com.learningportal.entity.User;

import java.time.LocalDateTime;

/**
 * Factory class for creating test data.
 * Provides consistent test data across all tests.
 */
public class TestDataFactory {

    /**
     * Creates a test user with default values.
     */
    public static User createUser(String username, String email) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash("$2a$10$hashedpassword"); // BCrypt hash
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return user;
    }

    /**
     * Creates a test user with custom password hash.
     */
    public static User createUser(String username, String email, String passwordHash) {
        User user = createUser(username, email);
        user.setPasswordHash(passwordHash);
        return user;
    }

    /**
     * Creates a test user with ID (for mocking persisted entities).
     */
    public static User createUserWithId(Long id, String username, String email) {
        User user = createUser(username, email);
        user.setId(id);
        return user;
    }
}
