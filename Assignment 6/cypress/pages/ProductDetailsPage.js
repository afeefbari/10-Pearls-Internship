/**
 * ProductDetailsPage - Page Object Model for SauceDemo product details page
 * Handles individual product page interactions and validations
 */
class ProductDetailsPage {
  // Locators
  productDetailsContainer = '.inventory_details_container';
  productName = '.inventory_details_name';
  productPrice = '.inventory_details_price';
  productDescription = '.inventory_details_desc';
  productImage = '.inventory_details_img img';
  addToCartButton = '[data-test="add-to-cart"]';
  removeButton = '[data-test="remove"]';
  backButton = '[data-test="back-to-products"]';
  cartBadge = '.shopping_cart_badge';
  cartLink = '.shopping_cart_link';

  /**
   * Verify product details page is displayed
   */
  verifyProductDetailsPageDisplayed() {
    cy.get(this.productDetailsContainer).should('be.visible');
    cy.get(this.productName).should('be.visible');
    cy.get(this.productPrice).should('be.visible');
  }

  /**
   * Get product name
   */
  getProductName() {
    return cy.get(this.productName).invoke('text');
  }

  /**
   * Get product price
   */
  getProductPrice() {
    return cy.get(this.productPrice).invoke('text');
  }

  /**
   * Get product description
   */
  getProductDescription() {
    return cy.get(this.productDescription).invoke('text');
  }

  /**
   * Verify product details are visible
   */
  verifyProductDetailsVisible() {
    cy.get(this.productImage).should('be.visible');
    cy.get(this.productName).should('be.visible');
    cy.get(this.productPrice).should('be.visible');
    cy.get(this.productDescription).should('be.visible');
  }

  /**
   * Add product to cart
   */
  addToCart() {
    cy.get(this.addToCartButton).click();
  }

  /**
   * Remove product from cart
   */
  removeFromCart() {
    cy.get(this.removeButton).click();
  }

  /**
   * Verify add to cart button is visible
   */
  verifyAddToCartButtonVisible() {
    cy.get(this.addToCartButton).should('be.visible');
  }

  /**
   * Verify remove button is visible
   */
  verifyRemoveButtonVisible() {
    cy.get(this.removeButton).should('be.visible');
  }

  /**
   * Click back to products button
   */
  goBackToProducts() {
    cy.get(this.backButton).click();
  }

  /**
   * Verify product price format
   * @param {string} price - Expected price format
   */
  verifyPriceFormat(price) {
    cy.get(this.productPrice).should('contain', price);
  }

  /**
   * Click cart link
   */
  clickCartLink() {
    cy.get(this.cartLink).click();
  }

  /**
   * Get cart badge number
   */
  getCartBadgeNumber() {
    return cy.get(this.cartBadge).invoke('text');
  }
}

module.exports = ProductDetailsPage;
