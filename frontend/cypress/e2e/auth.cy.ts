describe('Authentication Flow', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'TestPassword123!',
    fullName: 'Test User',
  };

  beforeEach(() => {
    // Clear local storage before each test
    cy.clearLocalStorage();
  });

  describe('Registration', () => {
    it('should successfully register a new user', () => {
      cy.visit('/register');
      
      // Fill in registration form
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('input[name="fullName"]').type(testUser.fullName);
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      
      // Should show user info
      cy.contains(testUser.fullName).should('be.visible');
    });

    it('should show error for duplicate username', () => {
      // First registration
      cy.register(testUser.username, testUser.email, testUser.password, testUser.fullName);
      
      // Logout
      cy.logout();
      
      // Try to register with same username
      cy.visit('/register');
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="email"]').type(`different_${Date.now()}@example.com`);
      cy.get('input[type="password"]').type(testUser.password);
      cy.get('input[name="fullName"]').type('Different User');
      cy.get('button[type="submit"]').click();
      
      // Should show error
      cy.contains(/username.*already.*exists/i).should('be.visible');
    });

    it('should validate required fields', () => {
      cy.visit('/register');
      
      // Try to submit empty form
      cy.get('button[type="submit"]').click();
      
      // Should show validation errors
      cy.get('input[name="username"]:invalid').should('exist');
      cy.get('input[name="email"]:invalid').should('exist');
      cy.get('input[type="password"]:invalid').should('exist');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      // Register a user for login tests
      cy.register(testUser.username, testUser.email, testUser.password, testUser.fullName);
      cy.logout();
    });

    it('should successfully login with valid credentials', () => {
      cy.visit('/login');
      
      // Fill in login form
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[type="password"]').type(testUser.password);
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      
      // Should show user info
      cy.contains(testUser.fullName).should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/login');
      
      // Fill in login form with wrong password
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[type="password"]').type('WrongPassword123!');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should show error
      cy.contains(/invalid.*credentials/i).should('be.visible');
      
      // Should stay on login page
      cy.url().should('include', '/login');
    });

    it('should validate required fields', () => {
      cy.visit('/login');
      
      // Try to submit empty form
      cy.get('button[type="submit"]').click();
      
      // Should show validation errors
      cy.get('input[name="username"]:invalid').should('exist');
      cy.get('input[type="password"]:invalid').should('exist');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      // Login before logout tests
      cy.register(testUser.username, testUser.email, testUser.password, testUser.fullName);
    });

    it('should successfully logout', () => {
      // Should be on dashboard
      cy.url().should('include', '/dashboard');
      
      // Click logout
      cy.logout();
      
      // Should redirect to login
      cy.url().should('include', '/login');
      
      // Local storage should be cleared
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.be.null;
      });
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing protected route without auth', () => {
      cy.visit('/dashboard');
      
      // Should redirect to login
      cy.url().should('include', '/login');
    });

    it('should allow access to protected route when authenticated', () => {
      // Login
      cy.register(testUser.username, testUser.email, testUser.password, testUser.fullName);
      
      // Visit dashboard
      cy.visit('/dashboard');
      
      // Should stay on dashboard
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Session Persistence', () => {
    it('should maintain session after page reload', () => {
      // Login
      cy.register(testUser.username, testUser.email, testUser.password, testUser.fullName);
      
      // Reload page
      cy.reload();
      
      // Should still be authenticated
      cy.url().should('include', '/dashboard');
      cy.contains(testUser.fullName).should('be.visible');
    });
  });
});
