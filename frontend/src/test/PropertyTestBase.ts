import * as fc from 'fast-check';

/**
 * Base utilities for property-based testing using fast-check.
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

/**
 * Default number of iterations for property tests.
 */
export const DEFAULT_NUM_RUNS = 100;

/**
 * Run a property test with default configuration.
 * 
 * @param property - The property to test
 * @param options - Optional fast-check configuration
 */
export function testProperty<T>(
  property: fc.IProperty<T>,
  options?: fc.Parameters<T>
) {
  return fc.assert(property, {
    numRuns: DEFAULT_NUM_RUNS,
    ...options,
  });
}

/**
 * Custom arbitraries for common test data.
 */
export const arbitraries = {
  /**
   * Generate valid usernames (5-50 alphanumeric characters).
   */
  username: () =>
    fc.string({ minLength: 5, maxLength: 50 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),

  /**
   * Generate valid emails.
   */
  email: () =>
    fc.emailAddress(),

  /**
   * Generate valid passwords (8-100 characters).
   */
  password: () =>
    fc.string({ minLength: 8, maxLength: 100 }),

  /**
   * Generate JWT tokens (mock format).
   */
  jwtToken: () =>
    fc.tuple(
      fc.base64String({ minLength: 20, maxLength: 50 }),
      fc.base64String({ minLength: 50, maxLength: 200 }),
      fc.base64String({ minLength: 20, maxLength: 50 })
    ).map(([header, payload, signature]) => `${header}.${payload}.${signature}`),

  /**
   * Generate programming language names.
   */
  programmingLanguage: () =>
    fc.constantFrom('java', 'javascript', 'python', 'c', 'cpp'),

  /**
   * Generate code snippets.
   */
  codeSnippet: () =>
    fc.string({ minLength: 10, maxLength: 1000 }),

  /**
   * Generate difficulty levels.
   */
  difficulty: () =>
    fc.constantFrom('easy', 'medium', 'hard'),

  /**
   * Generate positive integers.
   */
  positiveInt: () =>
    fc.integer({ min: 1, max: 1000000 }),

  /**
   * Generate timestamps.
   */
  timestamp: () =>
    fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
};

/**
 * Helper to create a property test with custom description.
 * 
 * @param description - Test description
 * @param property - The property to test
 */
export function property<T>(
  description: string,
  property: fc.IProperty<T>
): { description: string; property: fc.IProperty<T> } {
  return { description, property };
}
