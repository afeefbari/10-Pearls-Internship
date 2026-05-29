/**
 * CartPage - Page Object Model for SauceDemo shopping cart page
 * Handles cart operations and validations
 */
class CartPage {
  // Locators
  cartContainer = '.cart_list';
  cartItem = '.cart_item';
  cartItemName = '.inventory_item_name';
  cartItemPrice = '.inventory_item_price';
  cartItemQuantity = '.cart_quantity';
  removeButton = '[data-test^="remove"]';
  continueShoppingButton = '[data-test="continue-shopping"]';
  checkoutButton = '[data-test="checkout"]';
  cartBadge = '.shopping_cart_badge';

  /**
   * Verify cart page is displayed
   */
  verifyCartPageDisplayed() {
    cy.url().should('include', '/cart.html');
    cy.get(this.cartContainer).should('be.visible');
  }

  /**
   * Get cart item count
   */
  getCartItemCount() {
    return cy.get(this.cartItem).then((items) => items.length);
  }

  /**
   * Get all cart item names
   */
  getCartItemNames() {
    return cy.get(this.cartItemName).then((items) => {
      const names = [];
      items.each((index, item) => {
        names.push(Cypress.$(item).text());
      });
      return names;
    });
  }

  /**
   * Verify product is in cart
   * @param {string} productName - Name of the product
   */
  verifyProductInCart(productName) {
    cy.contains(this.cartItemName, productName).should('be.visible');
  }

  /**
   * Remove product from cart by name
   * @param {string} productName - Name of the product to remove
   */
  removeProduct(productName) {
    cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.removeButton)
      .click();
  }

  /**
   * Verify product is not in cart
   * @param {string} productName - Name of the product
   */
  verifyProductNotInCart(productName) {
    cy.contains(this.cartItemName, productName).should('not.exist');
  }

  /**
   * Verify cart is empty
   */
  verifyCartEmpty() {
    cy.get(this.cartItem).should('not.exist');
  }

  /**
   * Get product price in cart
   * @param {string} productName - Name of the product
   */
  getProductPrice(productName) {
    return cy.contains(this.cartItemName, productName)
      .closest(this.cartItem)
      .find(this.cartItemPrice)
      .invoke('text');
  }

  /**
   * Click continue shopping
   */
  clickContinueShopping() {
    cy.get(this.continueShoppingButton).click();
  }

  /**
   * Click checkout button
   */
  clickCheckout() {
    cy.get(this.checkoutButton).click();
  }

  /**
   * Verify checkout button is visible
   */
  verifyCheckoutButtonVisible() {
    cy.get(this.checkoutButton).should('be.visible');
  }

  /**
   * Verify continue shopping button is visible
   */
  verifyContinueShoppingButtonVisible() {
    cy.get(this.continueShoppingButton).should('be.visible');
  }
}

module.exports = CartPage;
