/**
 * Shopping Cart and Checkout Flow Test Suite
 * Tests cart operations, cart validation, and checkout flow
 */

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

describe('Shopping Cart and Checkout Flow', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  // Valid credentials for login
  const validCredentials = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  beforeEach(() => {
    // Clear cookies and local storage
    cy.clearCookies();
    cy.clearLocalStorage();

    // Login before each test
    cy.loginAndVerify(validCredentials.username, validCredentials.password);
  });

  it('Should add product to cart and verify in cart page', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify product is in cart
    cartPage.verifyProductInCart('Sauce Labs Backpack');
  });

  it('Should display correct cart count badge', () => {
    // Act - Add first product
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Assert - Verify cart badge shows 1
    inventoryPage.getCartBadgeNumber().should('equal', '1');

    // Add second product
    inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Assert - Verify cart badge shows 2
    inventoryPage.getCartBadgeNumber().should('equal', '2');
  });

  it('Should remove product from cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Remove product from cart
    cartPage.removeProduct('Sauce Labs Backpack');

    // Assert - Verify product is no longer in cart
    cartPage.verifyProductNotInCart('Sauce Labs Backpack');
  });

  it('Should continue shopping from cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Click continue shopping
    cartPage.clickContinueShopping();

    // Assert - Verify back on inventory page
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should display product details correctly in cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify product details in cart
    cartPage.verifyProductInCart('Sauce Labs Backpack');
    cartPage.getProductPrice('Sauce Labs Backpack').then((price) => {
      expect(price).to.match(/^\$/);
    });
  });

  it('Should add multiple products and display all in cart', () => {
    // Act - Add multiple products
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.addProductToCart('Sauce Labs Bike Light');
    inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify all products are in cart
    cartPage.verifyProductInCart('Sauce Labs Backpack');
    cartPage.verifyProductInCart('Sauce Labs Bike Light');
    cartPage.verifyProductInCart('Sauce Labs Bolt T-Shirt');

    // Verify cart item count
    cartPage.getCartItemCount().should('equal', 3);
  });

  it('Should maintain product count when navigating away from cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Verify item count
    cartPage.getCartItemCount().should('equal', 2);

    // Continue shopping
    cartPage.clickContinueShopping();

    // Navigate back to cart
    inventoryPage.clickCartLink();

    // Assert - Verify items are still there
    cartPage.getCartItemCount().should('equal', 2);
  });

  it('Should clear cart when removing all products', () => {
    // Act - Add products to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Remove all products
    cartPage.removeProduct('Sauce Labs Backpack');
    cartPage.removeProduct('Sauce Labs Bike Light');

    // Assert - Verify cart is empty
    cartPage.verifyCartEmpty();
  });

  it('Should display checkout button in cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify checkout button is visible
    cartPage.verifyCheckoutButtonVisible();
  });

  it('Should display continue shopping button in cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify continue shopping button is visible
    cartPage.verifyContinueShoppingButtonVisible();
  });

  it('Should navigate to cart page correctly', () => {
    // Act - Add product and navigate to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.clickCartLink();

    // Assert - Verify cart page URL
    cy.url().should('include', '/cart.html');
    cartPage.verifyCartPageDisplayed();
  });

  it('Should display empty cart when no products added', () => {
    // Act - Navigate to empty cart
    inventoryPage.clickCartLink();

    // Assert - Verify cart is empty
    cartPage.verifyCartEmpty();
  });

  it('Should verify correct product count in cart', () => {
    // Act - Add specific number of products
    const productsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
    ];

    productsToAdd.forEach((product) => {
      inventoryPage.addProductToCart(product);
    });

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Assert - Verify correct count
    cartPage.getCartItemCount().should('equal', productsToAdd.length);
  });

  it('Should maintain cart during page refresh', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Refresh page
    cy.reload();

    // Assert - Verify product is still in cart
    cartPage.verifyProductInCart('Sauce Labs Backpack');
  });

  it('Should remove specific product without affecting others', () => {
    // Act - Add multiple products
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.addProductToCart('Sauce Labs Bike Light');
    inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Navigate to cart
    inventoryPage.clickCartLink();

    // Remove middle product
    cartPage.removeProduct('Sauce Labs Bike Light');

    // Assert - Verify other products still exist
    cartPage.verifyProductInCart('Sauce Labs Backpack');
    cartPage.verifyProductInCart('Sauce Labs Bolt T-Shirt');
    cartPage.verifyProductNotInCart('Sauce Labs Bike Light');

    // Verify count is now 2
    cartPage.getCartItemCount().should('equal', 2);
  });

  it('Should verify checkout button leads to checkout page', () => {
    // Act - Add product and go to checkout
    inventoryPage.addProductToCart('Sauce Labs Backpack');
    inventoryPage.clickCartLink();
    cartPage.clickCheckout();

    // Assert - Verify checkout page URL
    cy.url().should('include', '/checkout-step-one.html');
  });
});