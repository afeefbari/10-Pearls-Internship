# SauceDemo Cypress Automation Framework

A comprehensive end-to-end (E2E) UI automation framework for the SauceDemo web application using Cypress testing framework. This project implements industry best practices including Page Object Model (POM), custom reusable commands, and structured test suites.

## Project Overview

This framework automates testing for the SauceDemo application (https://www.saucedemo.com) and demonstrates:

- ✅ Cypress automation framework fundamentals
- ✅ Page Object Model (POM) architecture for maintainable code
- ✅ Reusable custom Cypress commands
- ✅ Real user flow automation (login, product navigation, cart operations)
- ✅ Industry-standard repository structure
- ✅ Comprehensive test coverage with edge cases
- ✅ Best practices for debugging and test reliability

## Project Structure

```
cypress/
├── e2e/
│   ├── loginFailure.cy.js              # Login failure scenarios and error handling
│   ├── spec.cy.js                      # Login success and homepage validation
│   ├── spec-copy-1.cy.js               # Product navigation and validation
│   ├── spec-copy-2.cy.js               # Shopping cart and checkout flow
│   └── spec-copy-3.cy.js               # Advanced scenarios and edge cases
├── pages/
│   ├── LoginPage.js                    # Page Object Model for login page
│   ├── InventoryPage.js                # Page Object Model for product listing
│   ├── ProductDetailsPage.js           # Page Object Model for product details
│   └── CartPage.js                     # Page Object Model for shopping cart
├── support/
│   ├── commands.js                     # Custom Cypress commands
│   └── e2e.js                          # Support file initialization
└── fixtures/
    └── example.json                    # Test data fixtures

cypress.config.js                       # Cypress configuration
package.json                            # Project dependencies
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Verify installation:**
   ```bash
   npx cypress --version
   ```

## Running Tests

### Open Cypress Test Runner
Opens interactive test runner where you can select and run specific tests:
```bash
npx cypress open
```

### Run All Tests
Executes all test suites in headless mode:
```bash
npx cypress run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/loginFailure.cy.js"
```

### Run Tests in Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Run Tests in Headed Mode
```bash
npx cypress run --headed
```

### Run Tests with Video Recording
```bash
npx cypress run --record
```

## Page Object Model (POM) Structure

The framework uses POM to separate test logic from page element interactions and locators.

### Available Page Classes

#### LoginPage (`cypress/pages/LoginPage.js`)
Handles all login-related interactions:
- `navigate()` - Navigate to login page
- `login(username, password)` - Perform login
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `verifyErrorMessage(expectedError)` - Verify error is displayed
- `verifyLoginPageDisplayed()` - Verify login page UI

**Usage Example:**
```javascript
const loginPage = new LoginPage();
loginPage.navigate();
loginPage.login('standard_user', 'secret_sauce');
loginPage.verifyErrorMessage('Error message text');
```

#### InventoryPage (`cypress/pages/InventoryPage.js`)
Handles product listing and inventory operations:
- `verifyInventoryPageDisplayed()` - Verify inventory page loaded
- `getProductByName(productName)` - Find product element
- `clickProductByName(productName)` - Click on product
- `addProductToCart(productName)` - Add product to cart
- `removeProductFromCart(productName)` - Remove from cart
- `clickCartLink()` - Navigate to cart
- `logout()` - Perform logout

**Usage Example:**
```javascript
const inventoryPage = new InventoryPage();
inventoryPage.addProductToCart('Sauce Labs Backpack');
inventoryPage.verifyProductVisible('Sauce Labs Backpack');
```

#### ProductDetailsPage (`cypress/pages/ProductDetailsPage.js`)
Handles individual product page operations:
- `verifyProductDetailsPageDisplayed()` - Verify details page loaded
- `getProductName()` - Get product name
- `getProductPrice()` - Get product price
- `addToCart()` - Add to cart
- `goBackToProducts()` - Return to inventory
- `verifyProductDetailsVisible()` - Verify all details visible

**Usage Example:**
```javascript
const productDetailsPage = new ProductDetailsPage();
productDetailsPage.verifyProductDetailsPageDisplayed();
productDetailsPage.addToCart();
```

#### CartPage (`cypress/pages/CartPage.js`)
Handles shopping cart operations:
- `verifyCartPageDisplayed()` - Verify cart page loaded
- `verifyProductInCart(productName)` - Check product in cart
- `removeProduct(productName)` - Remove from cart
- `getCartItemCount()` - Get number of items
- `clickCheckout()` - Proceed to checkout
- `verifyCartEmpty()` - Verify empty cart

**Usage Example:**
```javascript
const cartPage = new CartPage();
cartPage.verifyProductInCart('Sauce Labs Backpack');
cartPage.removeProduct('Sauce Labs Backpack');
```

## Custom Commands

Custom commands provide high-level, reusable automation steps.

### Available Commands

#### Login Commands
```javascript
// Standard login
cy.login('standard_user', 'secret_sauce');

// Login and verify success
cy.loginAndVerify('standard_user', 'secret_sauce');
```

#### Navigation Commands
```javascript
// Navigate to cart
cy.goToCart();

// Navigate to product details
cy.navigateToProduct('Product Name');

// Logout
cy.logout();
```

#### Cart Commands
```javascript
// Add product to cart
cy.addProductToCart('Sauce Labs Backpack');
```

#### Product Commands
```javascript
// Verify single product exists
cy.verifyProductExists('Sauce Labs Backpack');

// Verify multiple products exist
cy.verifyProductsExist(['Product 1', 'Product 2', 'Product 3']);
```

#### Utility Commands
```javascript
// Wait for page load
cy.waitForPageLoad();

// Clear test data
cy.clearTestData();
```

### Using Custom Commands in Tests
```javascript
describe('Example Test', () => {
  it('Should use custom commands', () => {
    cy.loginAndVerify('standard_user', 'secret_sauce');
    cy.verifyProductExists('Sauce Labs Backpack');
    cy.addProductToCart('Sauce Labs Backpack');
    cy.goToCart();
  });
});
```

## Test Suites Overview

### 1. Login Failure Scenarios (`loginFailure.cy.js`)
Tests negative login cases and error handling:
- Invalid username
- Invalid password
- Empty username
- Empty password
- Empty credentials
- Failed login retry
- Special characters in password
- Case-sensitive username validation

**Key Test:**
```javascript
it('Should display error when logging in with invalid username', () => {
  const invalidUsername = 'invalid_user';
  const validPassword = 'secret_sauce';
  loginPage.login(invalidUsername, validPassword);
  loginPage.verifyErrorMessage('Username and password do not match any user');
});
```

### 2. Login Success and Homepage (`spec.cy.js`)
Tests successful login flows and homepage validation:
- Successful login with valid credentials
- No error message after successful login
- All products displayed
- Product count verification
- Homepage components visibility
- Cart navigation
- Menu access
- Logout functionality
- Session maintenance

**Key Test:**
```javascript
it('Should successfully login with valid credentials', () => {
  loginPage.login('standard_user', 'secret_sauce');
  cy.url().should('include', '/inventory.html');
  inventoryPage.verifyInventoryPageDisplayed();
});
```

### 3. Product Navigation (`spec-copy-1.cy.js`)
Tests product listing and navigation:
- Navigate to product details
- Verify product information
- Add to cart from details page
- Return to inventory
- Product price verification
- Multiple product navigation
- Cart maintenance during navigation
- Product image loading

**Key Test:**
```javascript
it('Should navigate to product details page', () => {
  cy.navigateToProduct('Sauce Labs Backpack');
  productDetailsPage.verifyProductDetailsPageDisplayed();
});
```

### 4. Shopping Cart and Checkout (`spec-copy-2.cy.js`)
Tests cart operations and checkout flow:
- Add products to cart
- Cart count badge display
- Remove products
- Continue shopping
- Cart persistence
- Multiple product management
- Empty cart handling
- Checkout navigation

**Key Test:**
```javascript
it('Should add product to cart and verify in cart page', () => {
  inventoryPage.addProductToCart('Sauce Labs Backpack');
  inventoryPage.clickCartLink();
  cartPage.verifyProductInCart('Sauce Labs Backpack');
});
```

### 5. Advanced Scenarios (`spec-copy-3.cy.js`)
Tests edge cases and special scenarios:
- Locked out user handling
- Problem user scenarios
- Session management
- Cookie handling
- Data persistence
- Performance user scenarios
- Input validation
- UI responsiveness
- Cross-feature integration

**Key Test:**
```javascript
it('Should display error for locked out user', () => {
  loginPage.login('locked_out_user', 'secret_sauce');
  loginPage.verifyErrorMessage('Sorry, this user has been locked out');
});
```

## SauceDemo Test Accounts

The SauceDemo application provides different test accounts:

| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard user with normal behavior |
| `locked_out_user` | `secret_sauce` | User account that is locked out |
| `problem_user` | `secret_sauce` | User with visual glitches |
| `performance_glitch_user` | `secret_sauce` | User experiencing performance issues |

## Cypress Configuration

The `cypress.config.js` file contains important configurations:

```javascript
{
  baseUrl: "https://www.saucedemo.com",      // Application base URL
  viewportWidth: 1280,                        // Browser viewport width
  viewportHeight: 720,                        // Browser viewport height
  defaultCommandTimeout: 10000,               // Timeout for commands (ms)
  specPattern: "cypress/e2e/**/*.cy.js",      // Test file pattern
  supportFile: "cypress/support/e2e.js"       // Support file location
}
```

## Best Practices Implemented

### 1. **Page Object Model**
- Locators are centralized in page classes
- Methods provide clear, readable test steps
- Changes to UI only require updates in one place

### 2. **Custom Commands**
- Reusable steps reduce code duplication
- Commands are well-documented
- Easy to maintain and update

### 3. **Test Organization**
- Tests are organized by functionality
- Clear describe blocks group related tests
- Descriptive test names explain what is being tested

### 4. **Setup and Teardown**
- `beforeEach()` hooks clear state before each test
- Consistent test environment ensures reliable results

### 5. **Assertions**
- Multiple assertions verify behavior thoroughly
- Clear assertion messages for debugging

### 6. **Error Handling**
- Tests verify both success and failure scenarios
- Error messages are validated

### 7. **Code Comments**
- JSDoc comments document all functions
- Inline comments explain complex logic

## Debugging Tests

### View Test Execution
1. Use Cypress Test Runner for interactive debugging
2. Hover over commands in the command log
3. Use `.debug()` command to pause execution

### Add Debug Statements
```javascript
it('Should debug test', () => {
  cy.loginAndVerify('standard_user', 'secret_sauce');
  cy.debug(); // Pauses execution
  inventoryPage.verifyInventoryPageDisplayed();
});
```

### Use Cypress DevTools
1. Open Cypress Test Runner
2. Click the browser DevTools icon
3. Inspect elements and check network requests

### Review Video Recordings
```bash
npx cypress run --record  # Records video of test execution
```

Videos are saved in `cypress/videos/` directory.

### Check Screenshot on Failure
```bash
npx cypress run --screenshot  # Takes screenshots on failure
```

Screenshots are saved in `cypress/screenshots/` directory.

## Common Issues and Solutions

### Issue: Tests fail intermittently
**Solution:** Increase `defaultCommandTimeout` in `cypress.config.js` or add explicit waits

### Issue: Elements not found
**Solution:** 
- Verify locators in browser DevTools
- Check for dynamic content loading delays
- Add appropriate waits using `.should()` assertions

### Issue: Session lost between tests
**Solution:** 
- Ensure `beforeEach()` clears cookies and localStorage
- Verify application session timeout settings

### Issue: Tests pass locally but fail in CI
**Solution:**
- Check browser compatibility in CI environment
- Verify test data consistency
- Review logs for environment-specific issues

## Contributing

When adding new tests or pages:

1. **Create new page class** in `cypress/pages/`
   - Define locators as class properties
   - Add methods for interactions
   - Include JSDoc comments

2. **Add custom commands** if reusable steps exist
   - Document command purpose
   - Include usage examples

3. **Write comprehensive tests**
   - Include positive and negative scenarios
   - Add clear test descriptions
   - Use appropriate assertions

4. **Follow naming conventions**
   - Test files: `*.cy.js`
   - Page classes: `PageName.js`
   - Descriptive variable names

## Performance Tips

1. **Run tests in parallel** (Cypress Cloud feature)
2. **Use custom commands** to reduce repeated code
3. **Optimize selectors** for faster element lookup
4. **Mock external requests** when appropriate
5. **Run only needed tests** during development

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Using-Page-Objects)
- [SauceDemo Application](https://www.saucedemo.com)

## License

This project is provided as-is for educational and testing purposes.

## Author

Created as part of 10-Pearls Internship Assignment 6

---

**Last Updated:** May 29, 2026
**Framework Version:** Cypress 15.16.0
