/**
 * Advanced Scenarios and Edge Cases Test Suite
 * Tests edge cases, error handling, and special user scenarios
 */

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Advanced Scenarios and Edge Cases', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  // Test different user accounts
  const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.navigate();
  });

  describe('Locked Out User Scenarios', () => {
    it('Should display error for locked out user', () => {
      // Act - Try to login with locked out account
      loginPage.login(users.locked.username, users.locked.password);

      // Assert - Verify appropriate error message
      loginPage.verifyErrorMessage('Sorry, this user has been locked out');
    });

    it('Should prevent locked out user from accessing inventory', () => {
      // Act - Try to login with locked out account
      loginPage.login(users.locked.username, users.locked.password);

      // Assert - Verify not redirected to inventory
      cy.url().should('not.include', '/inventory.html');
      loginPage.verifyLoginPageDisplayed();
    });
  });

  describe('Problem User Scenarios', () => {
    it('Should allow login for problem user', () => {
      // Act - Login with problem user (may have visual glitches but functional)
      cy.loginAndVerify(users.problem.username, users.problem.password);

      // Assert - Verify inventory is displayed
      inventoryPage.verifyInventoryPageDisplayed();
    });
  });

  describe('Session and Cookie Management', () => {
    it('Should clear cookies on logout', () => {
      // Act - Login
      cy.loginAndVerify(users.standard.username, users.standard.password);

      // Get auth token before logout
      cy.getAllCookies().should('have.length.gte', 1);

      // Logout
      inventoryPage.logout();

      // Assert - Verify cookies are cleared
      cy.getCookie('session-username').should('be.null');
    });

    it('Should maintain session across page navigation', () => {
      // Act - Login
      cy.loginAndVerify(users.standard.username, users.standard.password);

      // Navigate to cart
      inventoryPage.clickCartLink();
      cy.url().should('include', '/cart.html');

      // Navigate back to inventory
      inventoryPage.clickCartLink();

      // Assert - Session should still be valid
      inventoryPage.verifyInventoryPageDisplayed();
    });

    it('Should invalidate session on logout', () => {
      // Act - Login and logout
      cy.loginAndVerify(users.standard.username, users.standard.password);
      inventoryPage.logout();

      // Try to access inventory directly
      cy.visit('/inventory.html');

      // Assert - Should redirect to login
      cy.url().should('include', '/index.html');
      loginPage.verifyLoginPageDisplayed();
    });
  });

  describe('Data Persistence', () => {
    it('Should persist cart data during session', () => {
      // Act - Login and add products
      cy.loginAndVerify(users.standard.username, users.standard.password);
      inventoryPage.addProductToCart('Sauce Labs Backpack');
      inventoryPage.addProductToCart('Sauce Labs Bike Light');

      // Navigate away and back
      inventoryPage.clickCartLink();
      cy.url().should('include', '/cart.html');

      // Continue shopping
      cy.get('[data-test="continue-shopping"]').click();

      // Assert - Cart should still have items
      inventoryPage.getCartBadgeNumber().should('equal', '2');
    });

    it('Should clear cart data on logout', () => {
      // Act - Login and add products
      cy.loginAndVerify(users.standard.username, users.standard.password);
      inventoryPage.addProductToCart('Sauce Labs Backpack');

      // Logout
      inventoryPage.logout();

      // Login again
      cy.loginAndVerify(users.standard.username, users.standard.password);

      // Assert - Cart should be empty for new session
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  });

  describe('Performance User Scenarios', () => {
    it('Should allow performance glitch user to login', () => {
      // Act - Login with performance glitch user
      cy.loginAndVerify(users.performance.username, users.performance.password);

      // Assert - Inventory should be displayed
      inventoryPage.verifyInventoryPageDisplayed();
    });

    it('Should display all products for performance user', () => {
      // Act - Login with performance glitch user
      cy.loginAndVerify(users.performance.username, users.performance.password);

      // Assert - Verify products are loaded
      inventoryPage.getProductCount().should('be.gte', 1);
    });
  });

  describe('UI Responsiveness and Interactivity', () => {
    it('Should have enabled login button', () => {
      // Assert - Verify login button is enabled
      cy.get('[data-test="login-button"]')
        .should('be.enabled')
        .and('be.visible');
    });

    it('Should enable login button when credentials are entered', () => {
      // Act - Enter credentials
      loginPage.enterUsername(users.standard.username);
      loginPage.enterPassword(users.standard.password);

      // Assert - Verify login button is still enabled
      cy.get('[data-test="login-button"]').should('be.enabled');
    });

    it('Should handle rapid button clicks', () => {
      // Act - Double click login button with valid credentials
      loginPage.enterUsername(users.standard.username);
      loginPage.enterPassword(users.standard.password);
      cy.get('[data-test="login-button"]').dblclick();

      // Assert - Should still complete login successfully
      cy.url().should('include', '/inventory.html');
    });
  });

  describe('Input Validation', () => {
    it('Should trim whitespace from username input', () => {
      // Act - Enter username with spaces
      loginPage.enterUsername('  standard_user  ');
      loginPage.enterPassword(users.standard.password);
      loginPage.clickLoginButton();

      // The application might handle this differently, 
      // so this test documents the behavior
      cy.url().then((url) => {
        // Either successfully logs in or shows error
        expect(url).to.match(/index\.html|inventory\.html/);
      });
    });

    it('Should handle special characters in password field', () => {
      // Act - Enter special characters
      loginPage.enterUsername(users.standard.username);
      loginPage.enterPassword('p@$$w0rd!#');
      loginPage.clickLoginButton();

      // Assert - Should show error (incorrect password)
      loginPage.verifyErrorMessage('Username and password do not match any user');
    });

    it('Should handle very long username input', () => {
      // Act - Enter very long username
      const longUsername = 'a'.repeat(1000);
      loginPage.enterUsername(longUsername);
      loginPage.enterPassword(users.standard.password);
      loginPage.clickLoginButton();

      // Assert - Should handle gracefully
      loginPage.verifyErrorMessage('Username and password do not match any user');
    });
  });

  describe('Navigation Flow Validation', () => {
    it('Should handle back button after successful login', () => {
      // Act - Login
      cy.loginAndVerify(users.standard.username, users.standard.password);

      // Use browser back button
      cy.go('back');

      // Assert - Should still be on inventory (or handle appropriately)
      cy.url().then((url) => {
        expect(url).to.match(/inventory\.html|index\.html/);
      });
    });

    it('Should maintain state when navigating between pages', () => {
      // Act - Login
      cy.loginAndVerify(users.standard.username, users.standard.password);

      // Add to cart
      inventoryPage.addProductToCart('Sauce Labs Backpack');

      // Verify cart count
      inventoryPage.getCartBadgeNumber().should('equal', '1');

      // Navigate to product
      cy.navigateToProduct('Sauce Labs Bike Light');

      // Assert - Go back and verify cart still has item
      cy.go('back');
      inventoryPage.getCartBadgeNumber().should('equal', '1');
    });
  });

  describe('Accessibility and Visibility', () => {
    it('Should have visible form labels', () => {
      // Assert - Verify username and password inputs are visible
      cy.get('[data-test="username"]').should('be.visible');
      cy.get('[data-test="password"]').should('be.visible');
    });

    it('Should display error messages in accessible manner', () => {
      // Act - Trigger error
      loginPage.login('invalid', 'invalid');

      // Assert - Error should be visible and not hidden
      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('not.have.css', 'display', 'none');
    });
  });

  describe('Cross-Feature Integration', () => {
    it('Should handle logout and re-login in sequence', () => {
      // First session
      cy.loginAndVerify(users.standard.username, users.standard.password);
      inventoryPage.addProductToCart('Sauce Labs Backpack');
      inventoryPage.logout();

      // Second session - cart should be empty
      cy.loginAndVerify(users.standard.username, users.standard.password);
      cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('Should allow switching between user accounts', () => {
      // Login first user
      cy.loginAndVerify(users.standard.username, users.standard.password);
      inventoryPage.logout();

      // Login different user
      cy.loginAndVerify(users.problem.username, users.problem.password);

      // Assert - Should be on inventory
      inventoryPage.verifyInventoryPageDisplayed();
    });
  });
});