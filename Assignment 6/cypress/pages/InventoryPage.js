/**
 * InventoryPage - Page Object Model for SauceDemo inventory/product listing page
 * Handles product listing interactions and validations
 */
class InventoryPage {
  // Locators
  inventoryContainer = '.inventory_container';
  productList = '.inventory_list';
  productItem = '.inventory_item';
  productName = '.inventory_item_name';
  productPrice = '.inventory_item_price';
  productImage = '.inventory_item_img';
  addToCartButton = '[data-test^="add-to-cart"]';
  removeButton = '[data-test^="remove"]';
  cartBadge = '.shopping_cart_badge';
  cartLink = '.shopping_cart_link';
  productsHeader = '.products_label';
  sortContainer = '.product_sort_container';
  topLeftMenu = '#react-burger-menu-btn';
  logoutOption = '#logout_sidebar_link';

  /**
   * Verify inventory page is displayed
   */
  verifyInventoryPageDisplayed() {
    cy.get(this.inventoryContainer).should('be.visible');
    cy.get(this.productList).should('be.visible');
    cy.get(this.productsHeader).should('contain', 'Products');
  }

  /**
   * Get all product names on the page
   */
  getProductNames() {
    return cy.get(this.productName);
  }

  /**
   * Get number of products displayed
   */
  getProductCount() {
    return cy.get(this.productItem).then((products) => products.length);
  }

  /**
   * Get product by name
   * @param {string} productName - Name of the product to find
   */
  getProductByName(productName) {
    return cy.contains(this.productName, productName).closest(this.productItem);
  }

  /**
   * Click on a product by name
   * @param {string} productName - Name of the product to click
   */
  clickProductByName(productName) {
    this.getProductByName(productName)
      .find(this.productImage)
      .click();
  }

  /**
   * Add product to cart by name
   * @param {string} productName - Name of the product to add
   */
  addProductToCart(productName) {
    this.getProductByName(productName)
      .find(this.addToCartButton)
      .click();
  }

  /**
   * Remove product from cart by name
   * @param {string} productName - Name of the product to remove
   */
  removeProductFromCart(productName) {
    this.getProductByName(productName)
      .find(this.removeButton)
      .click();
  }

  /**
   * Verify product is visible
   * @param {string} productName - Name of the product
   */
  verifyProductVisible(productName) {
    this.getProductByName(productName).should('be.visible');
  }

  /**
   * Get product price by name
   * @param {string} productName - Name of the product
   */
  getProductPrice(productName) {
    return this.getProductByName(productName)
      .find(this.productPrice)
      .invoke('text');
  }

  /**
   * Verify all products are displayed
   */
  verifyAllProductsDisplayed() {
    cy.get(this.productItem).each((product) => {
      cy.wrap(product).should('be.visible');
      cy.wrap(product).find(this.productName).should('be.visible');
      cy.wrap(product).find(this.productPrice).should('be.visible');
    });
  }

  /**
   * Get cart badge number
   */
  getCartBadgeNumber() {
    return cy.get(this.cartBadge).invoke('text');
  }

  /**
   * Click on cart link
   */
  clickCartLink() {
    cy.get(this.cartLink).click();
  }

  /**
   * Verify add to cart button is visible for a product
   * @param {string} productName - Name of the product
   */
  verifyAddToCartButtonVisible(productName) {
    this.getProductByName(productName)
      .find(this.addToCartButton)
      .should('be.visible');
  }

  /**
   * Open menu
   */
  openMenu() {
    cy.get(this.topLeftMenu).click();
  }

  /**
   * Click logout
   */
  logout() {
    this.openMenu();
    cy.get(this.logoutOption).click();
  }
}

module.exports = InventoryPage;
