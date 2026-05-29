/**
 * Custom Commands for SauceDemo Cypress Tests
 * Provides reusable automation steps for common operations
 */

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const CartPage = require('../pages/CartPage');

/**
 * Custom command to perform login
 * Usage: cy.login('username', 'password')
 */
Cypress.Commands.add('login', (username, password) => {
  const loginPage = new LoginPage();
  loginPage.navigate();
  loginPage.login(username, password);
});

/**
 * Custom command to perform login and verify success
 * Usage: cy.loginAndVerify('username', 'password')
 */
Cypress.Commands.add('loginAndVerify', (username, password) => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  loginPage.navigate();
  loginPage.login(username, password);
  inventoryPage.verifyInventoryPageDisplayed();
});

/**
 * Custom command to navigate to cart and verify
 * Usage: cy.goToCart()
 */
Cypress.Commands.add('goToCart', () => {
  const inventoryPage = new InventoryPage();
  inventoryPage.clickCartLink();
  cy.url().should('include', '/cart.html');
});

/**
 * Custom command to add product to cart and verify
 * Usage: cy.addProductToCart('Product Name')
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  const inventoryPage = new InventoryPage();
  inventoryPage.addProductToCart(productName);
  cy.get('[data-test^="remove"]').should('be.visible');
});

/**
 * Custom command to verify product exists on page
 * Usage: cy.verifyProductExists('Product Name')
 */
Cypress.Commands.add('verifyProductExists', (productName) => {
  const inventoryPage = new InventoryPage();
  inventoryPage.verifyProductVisible(productName);
});

/**
 * Custom command to verify multiple products exist
 * Usage: cy.verifyProductsExist(['Product 1', 'Product 2', 'Product 3'])
 */
Cypress.Commands.add('verifyProductsExist', (productNames) => {
  const inventoryPage = new InventoryPage();
  productNames.forEach((productName) => {
    inventoryPage.verifyProductVisible(productName);
  });
});

/**
 * Custom command to navigate to a product and verify details
 * Usage: cy.navigateToProduct('Product Name')
 */
Cypress.Commands.add('navigateToProduct', (productName) => {
  const inventoryPage = new InventoryPage();
  const productDetailsPage = new ProductDetailsPage();
  inventoryPage.clickProductByName(productName);
  productDetailsPage.verifyProductDetailsPageDisplayed();
});

/**
 * Custom command to perform logout
 * Usage: cy.logout()
 */
Cypress.Commands.add('logout', () => {
  const inventoryPage = new InventoryPage();
  inventoryPage.logout();
  cy.url().should('include', '/index.html');
});

/**
 * Custom command to wait for page to load
 * Usage: cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('not.have.class', 'loading');
});

/**
 * Custom command to clear all test data
 * Usage: cy.clearTestData()
 */
Cypress.Commands.add('clearTestData', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});