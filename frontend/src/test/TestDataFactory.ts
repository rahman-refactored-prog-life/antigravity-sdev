/**
 * Factory for creating consistent test data across all tests.
 */

export interface TestUser {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestAuthResponse {
  token: string;
  user: TestUser;
}

export const TestDataFactory = {
  /**
   * Create a test user with default values.
   */
  createUser(
    username: string = 'testuser',
    email: string = 'test@example.com'
  ): TestUser {
    return {
      id: 1,
      username,
      email,
      fullName: 'Test User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Create a test user with custom ID.
   */
  createUserWithId(
    id: number,
    username: string = 'testuser',
    email: string = 'test@example.com'
  ): TestUser {
    return {
      ...this.createUser(username, email),
      id,
    };
  },

  /**
   * Create a test auth response.
   */
  createAuthResponse(user?: TestUser): TestAuthResponse {
    return {
      token: 'mock.jwt.token',
      user: user || this.createUser(),
    };
  },

  /**
   * Create a mock JWT token.
   */
  createJwtToken(username: string = 'testuser'): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub: username, exp: Date.now() + 3600000 }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  },
};
