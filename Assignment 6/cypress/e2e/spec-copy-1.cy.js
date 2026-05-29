/**
 * Product Navigation and Validation Test Suite
 * Tests product listing navigation and product details verification
 */

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');

describe('Product Navigation and Validation', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const productDetailsPage = new ProductDetailsPage();

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

  it('Should display all products on inventory page', () => {
    // Assert - Verify products are visible
    inventoryPage.verifyAllProductsDisplayed();
  });

  it('Should navigate to product details page', () => {
    // Act - Click on first product
    inventoryPage.getProductByName('Sauce Labs Backpack')
      .find('.inventory_item_img')
      .click();

    // Assert - Verify product details page is displayed
    productDetailsPage.verifyProductDetailsPageDisplayed();
  });

  it('Should display product details correctly', () => {
    // Act - Navigate to product details
    cy.navigateToProduct('Sauce Labs Backpack');

    // Assert - Verify product details are visible
    productDetailsPage.verifyProductDetailsVisible();
    productDetailsPage.getProductName().should('not.be.empty');
    productDetailsPage.getProductPrice().should('not.be.empty');
    productDetailsPage.getProductDescription().should('not.be.empty');
  });

  it('Should have add to cart button on product details page', () => {
    // Act - Navigate to product details
    cy.navigateToProduct('Sauce Labs Backpack');

    // Assert - Verify add to cart button is visible
    productDetailsPage.verifyAddToCartButtonVisible();
  });

  it('Should navigate back to inventory page from product details', () => {
    // Act - Navigate to product and then back
    cy.navigateToProduct('Sauce Labs Backpack');
    productDetailsPage.goBackToProducts();

    // Assert - Verify back on inventory page
    inventoryPage.verifyInventoryPageDisplayed();
  });

  it('Should add product to cart from product details page', () => {
    // Act - Navigate to product and add to cart
    cy.navigateToProduct('Sauce Labs Backpack');
    productDetailsPage.addToCart();

    // Assert - Verify remove button is now visible (indicating product in cart)
    productDetailsPage.verifyRemoveButtonVisible();
  });

  it('Should display correct product price format', () => {
    // Act - Navigate to product details
    cy.navigateToProduct('Sauce Labs Backpack');

    // Assert - Verify price format (should contain $ sign)
    cy.get('.inventory_details_price').then(($price) => {
      const priceText = $price.text();
      expect(priceText).to.match(/^\$/);
    });
  });

  it('Should verify product name on details page matches inventory', () => {
    // Act - Get product name from inventory
    inventoryPage.getProductByName('Sauce Labs Backpack')
      .find('.inventory_item_name')
      .invoke('text')
      .then((inventoryName) => {
        // Navigate to product details
        cy.navigateToProduct('Sauce Labs Backpack');

        // Verify name matches
        productDetailsPage.getProductName().should('equal', inventoryName);
      });
  });

  it('Should verify product price on details page matches inventory', () => {
    // Act - Get product price from inventory
    inventoryPage.getProductPrice('Sauce Labs Backpack')
      .then((inventoryPrice) => {
        // Navigate to product details
        cy.navigateToProduct('Sauce Labs Backpack');

        // Verify price matches
        productDetailsPage.getProductPrice().should('equal', inventoryPrice);
      });
  });

  it('Should allow adding multiple products to cart', () => {
    // Add first product
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Add second product
    inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Add third product
    inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    // Assert - Verify cart badge shows 3 items
    inventoryPage.getCartBadgeNumber().should('equal', '3');
  });

  it('Should remove product from inventory and reflect in cart', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Verify add to cart button changed to remove
    inventoryPage.getProductByName('Sauce Labs Backpack')
      .find('[data-test^="remove"]')
      .should('be.visible');

    // Remove product
    inventoryPage.removeProductFromCart('Sauce Labs Backpack');

    // Assert - Verify add to cart button is back
    inventoryPage.getProductByName('Sauce Labs Backpack')
      .find('[data-test^="add-to-cart"]')
      .should('be.visible');
  });

  it('Should navigate through multiple products sequentially', () => {
    // Product list
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    // Act & Assert - Navigate through each product
    products.forEach((product) => {
      cy.navigateToProduct(product);
      productDetailsPage.verifyProductDetailsVisible();
      productDetailsPage.goBackToProducts();
      inventoryPage.verifyInventoryPageDisplayed();
    });
  });

  it('Should verify all products have valid prices', () => {
    // Assert - Check all products have prices
    cy.get('.inventory_item_price').each(($price) => {
      const priceText = $price.text();
      expect(priceText).to.match(/^\$/);
      expect(priceText).not.to.be.empty;
    });
  });

  it('Should verify all products are clickable', () => {
    // Act & Assert - Verify each product image is clickable
    cy.get('.inventory_item_img').each(($img) => {
      cy.wrap($img).should('be.visible');
      cy.wrap($img).should('have.css', 'cursor');
    });
  });

  it('Should maintain cart items while navigating products', () => {
    // Act - Add product to cart
    inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Navigate to product details
    cy.navigateToProduct('Sauce Labs Bike Light');

    // Go back
    productDetailsPage.goBackToProducts();

    // Assert - Verify first product is still in cart
    inventoryPage.getProductByName('Sauce Labs Backpack')
      .find('[data-test^="remove"]')
      .should('be.visible');

    // Verify cart badge still shows 1 item
    inventoryPage.getCartBadgeNumber().should('equal', '1');
  });

  it('Should display product images correctly', () => {
    // Act & Assert - Verify all product images are loaded
    cy.get('.inventory_item_img img').each(($img) => {
      cy.wrap($img).should('be.visible');
      cy.wrap($img).should('have.attr', 'src');
    });
  });
});