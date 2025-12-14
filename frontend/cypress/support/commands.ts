/// <reference types="cypress" />

// ***********************************************
// Custom commands for E2E testing
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login
       * @example cy.login('testuser', 'password123')
       */
      login(username: string, password: string): Chainable<void>;
      
      /**
       * Custom command to register a new user
       * @example cy.register('testuser', 'test@example.com', 'password123', 'Test User')
       */
      register(username: string, email: string, password: string, fullName: string): Chainable<void>;
      
      /**
       * Custom command to logout
       * @example cy.logout()
       */
      logout(): Chainable<void>;
    }
  }
}

// Login command
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

// Register command
Cypress.Commands.add('register', (username: string, email: string, password: string, fullName: string) => {
  cy.visit('/register');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('input[name="fullName"]').type(fullName);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/register');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/login');
});

export {};
