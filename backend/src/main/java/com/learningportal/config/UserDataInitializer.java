package com.learningportal.config;

import com.learningportal.entity.User;
import com.learningportal.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collections;

@Configuration
public class UserDataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(UserDataInitializer.class);

    @Bean
    public CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("testuser").isEmpty()) {
                logger.info("Creating test user 'testuser'...");
                User user = new User();
                user.setUsername("testuser");
                user.setEmail("test@example.com");
                // "password123"
                user.setPasswordHash(passwordEncoder.encode("password123"));
                user.setFullName("Test User");
                user.setRoles(Collections.singleton("USER"));
                user.setCreatedAt(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());

                userRepository.save(user);
                logger.info("Test user created successfully.");
            } else {
                logger.info("Test user already exists. Skipping creation.");
            }
        };
    }
}
