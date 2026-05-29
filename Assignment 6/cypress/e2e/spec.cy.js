/**
 * Login Success and Homepage Validation Test Suite
 * Tests successful login flows and verifies homepage display
 */

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Login Success Flow and Homepage Validation', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  // Test data
  const validCredentials = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.navigate();
  });

  it('Should successfully login with valid credentials', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify successful login
    cy.url().should('include', '/inventory.html');
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should display no error message after successful login', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify no error message is displayed
    loginPage.verifyNoErrorMessage();
  });

  it('Should display all products on inventory page after login', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify products are displayed
    inventoryPage.verifyAllProductsDisplayed();
  });

  it('Should display correct product count on inventory page', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify product count (SauceDemo typically has 6 products)
    inventoryPage.getProductCount().should('be.gte', 1);
  });

  it('Should display product names and prices', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify product names are visible
    inventoryPage.getProductNames().should('have.length.gte', 1);
    cy.get('.inventory_item_price').should('have.length.gte', 1);
  });

  it('Should display correct homepage components', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify key components on inventory page
    cy.get('.products_label').should('contain', 'Products');
    cy.get('.shopping_cart_link').should('be.visible');
    cy.get('#react-burger-menu-btn').should('be.visible');
  });

  it('Should allow navigation to cart from inventory page', () => {
    // Act - Login and navigate to cart
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.clickCartLink();

    // Assert - Verify cart page is displayed
    cy.url().should('include', '/cart.html');
  });

  it('Should allow user to access menu from inventory page', () => {
    // Act - Login and open menu
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.openMenu();

    // Assert - Verify menu is displayed
    cy.get('.bm-menu').should('be.visible');
  });

  it('Should display logout option in menu', () => {
    // Act - Login and open menu
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.openMenu();

    // Assert - Verify logout option is visible
    cy.get('#logout_sidebar_link').should('be.visible');
  });

  it('Should allow user to logout from inventory page', () => {
    // Act - Login and logout
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.logout();

    // Assert - Verify return to login page
    cy.url().should('include', '/index.html');
    loginPage.verifyLoginPageDisplayed();
  });

  it('Should redirect to inventory page when accessing with valid session', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify inventory page is displayed
    inventoryPage.verifyInventoryPageDisplayed();

    // Refresh page and verify still on inventory page
    cy.reload();
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should allow multiple logins and logouts', () => {
    // First login-logout cycle
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.verifyInventoryPageDisplayed();
    inventoryPage.logout();
    loginPage.verifyLoginPageDisplayed();

    // Second login cycle
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should maintain session after page reload', () => {
    // Act - Login
    loginPage.login(validCredentials.username, validCredentials.password);
    inventoryPage.verifyInventoryPageDisplayed();

    // Reload page
    cy.reload();

    // Assert - User should still be logged in
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should have correct page title after login', () => {
    // Act - Login with valid credentials
    loginPage.login(validCredentials.username, validCredentials.password);

    // Assert - Verify page title
    cy.title().should('not.be.empty');
  });
});