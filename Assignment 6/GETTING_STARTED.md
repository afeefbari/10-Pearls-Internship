# Getting Started with SauceDemo Cypress Automation

This guide will help you get started with the SauceDemo Cypress automation framework.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Open Cypress Test Runner
```bash
npm run test:open
```

### 3. Select and Run Tests
- Select a test file from the list
- Click to run the test
- Watch the test execute in real-time

## Running Tests from Command Line

### Run All Tests
```bash
npm run test
```
Runs all test suites in headless mode.

### Run Tests in Interactive Mode
```bash
npm run test:open
```
Opens Cypress Test Runner for interactive testing.

### Run Specific Test Suite
```bash
npm run test:login-failure    # Login failure tests
npm run test:login-success    # Login success tests
npm run test:product-nav      # Product navigation tests
npm run test:cart             # Cart and checkout tests
npm run test:advanced         # Advanced scenarios
```

### Run Tests in Different Browsers
```bash
npm run test:chrome           # Chrome browser
npm run test:firefox          # Firefox browser
npm run test:edge             # Edge browser
```

### Debug Mode
```bash
npm run test:debug
```
Runs tests in headed mode without exiting, allowing inspection.

## Understanding the Framework

### What is Page Object Model (POM)?

Page Object Model is a design pattern that improves test maintenance and readability:

**Without POM (Hard to maintain):**
```javascript
cy.get('[data-test="username"]').type('standard_user');
cy.get('[data-test="password"]').type('secret_sauce');
cy.get('[data-test="login-button"]').click();
```

**With POM (Clean and maintainable):**
```javascript
const loginPage = new LoginPage();
loginPage.login('standard_user', 'secret_sauce');
```

**Benefits:**
- Locators are centralized in page classes
- UI changes only require updates in one place
- Tests are more readable and maintainable
- Reduces code duplication

### Page Classes

#### LoginPage
Located in `cypress/pages/LoginPage.js`

Key methods:
- `navigate()` - Go to login page
- `login(username, password)` - Perform login
- `verifyErrorMessage(message)` - Check error displayed
- `verifyLoginPageDisplayed()` - Verify page loaded

Example usage:
```javascript
const loginPage = new LoginPage();
loginPage.navigate();
loginPage.login('standard_user', 'secret_sauce');
```

#### InventoryPage
Located in `cypress/pages/InventoryPage.js`

Key methods:
- `verifyInventoryPageDisplayed()` - Check inventory loaded
- `addProductToCart(productName)` - Add product to cart
- `clickProductByName(productName)` - Click product
- `logout()` - Sign out

Example usage:
```javascript
const inventoryPage = new InventoryPage();
inventoryPage.addProductToCart('Sauce Labs Backpack');
inventoryPage.clickCartLink();
```

#### ProductDetailsPage
Located in `cypress/pages/ProductDetailsPage.js`

Key methods:
- `verifyProductDetailsPageDisplayed()` - Check product page loaded
- `getProductName()` - Get product name
- `addToCart()` - Add to cart
- `goBackToProducts()` - Return to inventory

Example usage:
```javascript
const productDetailsPage = new ProductDetailsPage();
productDetailsPage.verifyProductDetailsPageDisplayed();
productDetailsPage.addToCart();
```

#### CartPage
Located in `cypress/pages/CartPage.js`

Key methods:
- `verifyProductInCart(productName)` - Check product in cart
- `removeProduct(productName)` - Remove product
- `clickCheckout()` - Go to checkout
- `getCartItemCount()` - Get item count

Example usage:
```javascript
const cartPage = new CartPage();
cartPage.verifyProductInCart('Sauce Labs Backpack');
cartPage.removeProduct('Sauce Labs Backpack');
```

### Custom Commands

Custom commands are reusable steps for common operations.

#### Login Commands
```javascript
// Login and navigate to inventory
cy.loginAndVerify('standard_user', 'secret_sauce');

// Simple login
cy.login('standard_user', 'secret_sauce');
```

#### Navigation Commands
```javascript
// Go to cart
cy.goToCart();

// Navigate to product details
cy.navigateToProduct('Sauce Labs Backpack');

// Logout
cy.logout();
```

#### Product Commands
```javascript
// Verify product exists
cy.verifyProductExists('Sauce Labs Backpack');

// Add to cart
cy.addProductToCart('Sauce Labs Backpack');
```

## Writing Your First Test

### Step 1: Create a Test File
Create `cypress/e2e/myTest.cy.js`:

```javascript
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('My First Test', () => {
  it('Should login successfully', () => {
    // Arrange
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    // Act
    loginPage.navigate();
    loginPage.login('standard_user', 'secret_sauce');

    // Assert
    inventoryPage.verifyInventoryPageDisplayed();
  });
});
```

### Step 2: Run the Test
```bash
npx cypress run --spec "cypress/e2e/myTest.cy.js"
```

### Step 3: View Results
- In Cypress Test Runner: See test execution in real-time
- In terminal: View test results summary

## Test Structure Best Practices

All tests follow this structure:

```javascript
describe('Feature Name', () => {
  // Setup page objects
  const page = new PageName();

  beforeEach(() => {
    // Clear state before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    // Navigate/login if needed
    page.navigate();
  });

  it('Should do specific thing', () => {
    // Arrange - Prepare test data
    const testData = 'value';

    // Act - Perform actions
    page.performAction(testData);

    // Assert - Verify results
    page.verifyState();
  });
});
```

## Available Test Scenarios

### Login Tests
- `loginFailure.cy.js` - Tests login error handling
  - Invalid credentials
  - Empty fields
  - Locked out users
  - Edge cases

### Homepage Tests
- `spec.cy.js` - Tests successful login and homepage
  - Login with valid credentials
  - Verify all components
  - Session management
  - Logout functionality

### Product Navigation
- `spec-copy-1.cy.js` - Tests product browsing
  - View product details
  - Add to cart from details
  - Navigate between products
  - Verify product information

### Cart Operations
- `spec-copy-2.cy.js` - Tests shopping cart
  - Add products to cart
  - Remove from cart
  - View cart contents
  - Proceed to checkout

### Advanced Scenarios
- `spec-copy-3.cy.js` - Tests edge cases
  - Different user types (locked, problem user)
  - Session management
  - Data persistence
  - Input validation

## Debugging Tips

### 1. Use Cypress Test Runner
```bash
npm run test:open
```
- Hover over commands to see elements
- Step through test execution
- Inspect DOM elements
- View network requests

### 2. Add Debug Breakpoints
```javascript
it('Should debug test', () => {
  cy.loginAndVerify('standard_user', 'secret_sauce');
  cy.debug(); // Pauses here for inspection
  cy.verifyProductExists('Product Name');
});
```

### 3. View Element Details
```javascript
cy.get('[data-test="username"]').then(($input) => {
  console.log('Input value:', $input.val());
  console.log('Input visible:', $input.is(':visible'));
});
```

### 4. Check Network Requests
- Open DevTools in Cypress Test Runner
- View Network tab
- Check API calls and responses

## Common Test Patterns

### Testing Login Flow
```javascript
const loginPage = new LoginPage();
loginPage.navigate();
loginPage.login('standard_user', 'secret_sauce');
// Verify logged in
cy.url().should('include', '/inventory.html');
```

### Testing Product Addition
```javascript
const inventoryPage = new InventoryPage();
inventoryPage.addProductToCart('Sauce Labs Backpack');
// Verify in cart badge
inventoryPage.getCartBadgeNumber().should('equal', '1');
```

### Testing Navigation
```javascript
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
inventoryPage.clickCartLink();
cartPage.verifyCartPageDisplayed();
```

### Testing Error Handling
```javascript
const loginPage = new LoginPage();
loginPage.navigate();
loginPage.login('invalid', 'invalid');
loginPage.verifyErrorMessage('Username and password do not match');
```

## Test Data

### User Accounts Available
```javascript
const users = {
  standard: { 
    username: 'standard_user', 
    password: 'secret_sauce' 
  },
  locked: { 
    username: 'locked_out_user', 
    password: 'secret_sauce' 
  },
  problem: { 
    username: 'problem_user', 
    password: 'secret_sauce' 
  },
  performance: { 
    username: 'performance_glitch_user', 
    password: 'secret_sauce' 
  }
};
```

### Available Products
- Sauce Labs Backpack
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt
- Sauce Labs Fleece Jacket
- Sauce Labs Onesie
- Test.allTheThings() T-Shirt

## Troubleshooting

### Tests Fail with "Element not found"
**Solution:**
1. Verify locator in browser: Right-click → Inspect
2. Update locator in page class
3. Add explicit waits if needed

### Tests Timeout
**Solution:**
1. Increase `defaultCommandTimeout` in `cypress.config.js`
2. Add `.should()` assertions for implicit waits
3. Check for page load delays

### Session Issues
**Solution:**
1. Verify `beforeEach()` clears cookies
2. Check application session settings
3. Review server logs for session errors

### Different Results Locally vs CI
**Solution:**
1. Check browser compatibility
2. Verify test data consistency
3. Check environment variables
4. Review CI logs

## Next Steps

1. **Run existing tests** to understand the framework
2. **Read test files** to learn patterns
3. **Create your own tests** following the structure
4. **Debug tests** to understand execution
5. **Expand test coverage** with new scenarios

## Resources

- [Cypress Official Docs](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)
- [SauceDemo](https://www.saucedemo.com)

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review existing test examples
3. Check Cypress documentation
4. Review test output and error messages

---

Happy Testing! 🚀
