import { describe, it, expect } from 'vitest';
import { TestDataFactory } from '../test/TestDataFactory';

/**
 * Sample unit tests for authentication utilities.
 * Demonstrates the testing framework setup.
 */

describe('Authentication Utilities', () => {
  describe('JWT Token Parsing', () => {
    it('should parse valid JWT token', () => {
      // Given
      const token = TestDataFactory.createJwtToken('testuser');

      // When
      const parts = token.split('.');

      // Then
      expect(parts).toHaveLength(3);
      expect(parts[0]).toBeTruthy(); // header
      expect(parts[1]).toBeTruthy(); // payload
      expect(parts[2]).toBeTruthy(); // signature
    });

    it('should extract username from JWT payload', () => {
      // Given
      const username = 'testuser';
      const token = TestDataFactory.createJwtToken(username);

      // When
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Then
      expect(payload.sub).toBe(username);
    });

    it('should handle invalid JWT token', () => {
      // Given
      const invalidToken = 'invalid.token';

      // When
      const parts = invalidToken.split('.');

      // Then
      expect(parts).toHaveLength(2); // Not 3 parts
    });
  });

  describe('Test Data Factory', () => {
    it('should create user with default values', () => {
      // When
      const user = TestDataFactory.createUser();

      // Then
      expect(user).toBeDefined();
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.id).toBe(1);
    });

    it('should create user with custom values', () => {
      // When
      const user = TestDataFactory.createUser('customuser', 'custom@example.com');

      // Then
      expect(user.username).toBe('customuser');
      expect(user.email).toBe('custom@example.com');
    });

    it('should create auth response', () => {
      // When
      const authResponse = TestDataFactory.createAuthResponse();

      // Then
      expect(authResponse.token).toBeDefined();
      expect(authResponse.user).toBeDefined();
      expect(authResponse.user.username).toBe('testuser');
    });
  });
});
