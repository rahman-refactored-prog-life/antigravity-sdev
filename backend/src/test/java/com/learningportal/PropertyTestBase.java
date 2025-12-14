package com.learningportal;

import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.constraints.*;

/**
 * Base class for property-based tests using jqwik.
 * 
 * Property-based tests validate universal properties that should hold
 * across all valid inputs, not just specific examples.
 * 
 * Each property test runs 100 iterations by default with randomly
 * generated inputs to find edge cases and validate correctness.
 * 
 * Tag format: "Feature: {feature_name}, Property {number}: {property_text}"
 * Example: "Feature: comprehensive-learning-portal, Property 1: JWT Token Round-Trip"
 */
public abstract class PropertyTestBase {

    /**
     * Default number of iterations for property tests.
     * Can be overridden with @Property(tries = N) annotation.
     */
    protected static final int DEFAULT_TRIES = 100;

    /**
     * Helper method to validate property test results.
     * Use this in property tests to ensure consistent validation.
     */
    protected void assertProperty(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError("Property violated: " + message);
        }
    }
}
