package com.learningportal;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Base class for all unit tests.
 * Provides common setup and utilities for testing.
 */
@ActiveProfiles("test")
public abstract class TestBase {

    @BeforeEach
    public void setUp() {
        // Common setup for all tests
    }

    /**
     * Helper method to create test data.
     * Override in subclasses as needed.
     */
    protected void setupTestData() {
        // Override in subclasses
    }
}
