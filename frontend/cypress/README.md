# Cypress E2E Testing

## Overview

This directory contains End-to-End (E2E) tests for the Learning Portal using Cypress.

## Running Tests

### Interactive Mode (Cypress Test Runner)
```bash
npm run cypress
# or
npm run test:e2e:open
```

### Headless Mode (CI/CD)
```bash
npm run cypress:headless
# or
npm run test:e2e
```

## Test Structure

```
cypress/
├── e2e/              # E2E test specs
│   └── auth.cy.ts    # Authentication flow tests
├── support/          # Support files and custom commands
│   ├── commands.ts   # Custom Cypress commands
│   └── e2e.ts        # Global configuration
└── README.md         # This file
```

## Custom Commands

### `cy.login(username, password)`
Logs in a user with the provided credentials.

```typescript
cy.login('testuser', 'password123');
```

### `cy.register(username, email, password, fullName)`
Registers a new user.

```typescript
cy.register('testuser', 'test@example.com', 'password123', 'Test User');
```

### `cy.logout()`
Logs out the current user.

```typescript
cy.logout();
```

## Test Coverage

### Authentication Flow (`auth.cy.ts`)
- ✅ User registration
- ✅ Duplicate username validation
- ✅ Required field validation
- ✅ User login
- ✅ Invalid credentials handling
- ✅ User logout
- ✅ Protected route access
- ✅ Session persistence

## Writing New Tests

1. Create a new file in `cypress/e2e/` with `.cy.ts` extension
2. Use descriptive `describe` and `it` blocks
3. Follow the Arrange-Act-Assert pattern
4. Use custom commands for common operations
5. Clean up test data in `beforeEach` or `afterEach` hooks

### Example Test

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should do something', () => {
    // Arrange
    cy.visit('/some-page');
    
    // Act
    cy.get('button').click();
    
    // Assert
    cy.url().should('include', '/expected-url');
  });
});
```

## Best Practices

1. **Use data-testid attributes** for stable selectors
2. **Avoid hardcoded waits** - use Cypress's built-in retry logic
3. **Keep tests independent** - each test should work in isolation
4. **Clean up after tests** - remove test data to avoid conflicts
5. **Use custom commands** for repeated actions
6. **Test user flows** not implementation details

## Configuration

Configuration is in `cypress.config.ts`:
- Base URL: `http://localhost:2025`
- Viewport: 1280x720
- Video recording: Disabled (enable for CI/CD)
- Screenshots: Enabled on failure

## CI/CD Integration

Add to your CI/CD pipeline:

```yaml
- name: Run E2E Tests
  run: |
    npm run build
    npm run test:e2e
```

## Troubleshooting

### Tests failing locally
1. Ensure backend is running on port 2025
2. Ensure database is running
3. Clear browser cache and local storage
4. Check Cypress console for errors

### Tests passing locally but failing in CI
1. Check viewport size differences
2. Verify environment variables
3. Check for timing issues (add explicit waits if needed)
4. Review CI logs and screenshots

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
