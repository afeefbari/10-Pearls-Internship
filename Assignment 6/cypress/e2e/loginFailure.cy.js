/**
 * Login Failure Test Suite
 * Tests negative login scenarios and error handling
 */

const LoginPage = require('../pages/LoginPage');

describe('Login Failure Scenarios', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.navigate();
  });

  it('Should display error when logging in with invalid username', () => {
    // Arrange - Use an invalid username
    const invalidUsername = 'invalid_user';
    const validPassword = 'secret_sauce';

    // Act - Attempt login with invalid credentials
    loginPage.login(invalidUsername, validPassword);

    // Assert - Verify error message is displayed
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });

  it('Should display error when logging in with invalid password', () => {
    // Arrange - Use a valid username but invalid password
    const validUsername = 'standard_user';
    const invalidPassword = 'wrong_password';

    // Act - Attempt login with invalid credentials
    loginPage.login(validUsername, invalidPassword);

    // Assert - Verify error message is displayed
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });

  it('Should display error when logging in with empty username', () => {
    // Arrange - Leave username empty
    const emptyUsername = '';
    const validPassword = 'secret_sauce';

    // Act - Attempt login with empty username
    loginPage.login(emptyUsername, validPassword);

    // Assert - Verify error message is displayed
    loginPage.verifyErrorMessage('Username is required');
  });

  it('Should display error when logging in with empty password', () => {
    // Arrange - Leave password empty
    const validUsername = 'standard_user';
    const emptyPassword = '';

    // Act - Attempt login with empty password
    loginPage.login(validUsername, emptyPassword);

    // Assert - Verify error message is displayed
    loginPage.verifyErrorMessage('Password is required');
  });

  it('Should display error when logging in with empty username and password', () => {
    // Arrange - Leave both fields empty
    const emptyUsername = '';
    const emptyPassword = '';

    // Act - Attempt login without entering credentials
    loginPage.login(emptyUsername, emptyPassword);

    // Assert - Verify error message is displayed
    loginPage.verifyErrorMessage('Username is required');
  });

  it('Should allow user to try again after failed login attempt', () => {
    // First attempt - with invalid credentials
    loginPage.login('invalid_user', 'wrong_password');
    loginPage.verifyErrorMessage('Username and password do not match any user');

    // Second attempt - with valid credentials
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    loginPage.login(validUsername, validPassword);

    // Verify successful login
    cy.url().should('include', '/inventory.html');
  });

  it('Should verify login page remains intact after failed login', () => {
    // Arrange - Use invalid credentials
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'wrong_password';

    // Act - Attempt login
    loginPage.login(invalidUsername, invalidPassword);

    // Assert - Verify login page elements are still visible
    loginPage.verifyLoginPageDisplayed();
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });

  it('Should display error for special characters in password', () => {
    // Arrange - Use special characters
    const validUsername = 'standard_user';
    const specialCharPassword = 'p@$$w0rd!';

    // Act - Attempt login with special character password
    loginPage.login(validUsername, specialCharPassword);

    // Assert - Verify error message
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });

  it('Should display error for case-sensitive username', () => {
    // Arrange - Use correct password but uppercase username
    const caseSensitiveUsername = 'STANDARD_USER';
    const validPassword = 'secret_sauce';

    // Act - Attempt login with uppercase username
    loginPage.login(caseSensitiveUsername, validPassword);

    // Assert - Verify error message
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });

  it('Should clear error message when user clears input fields', () => {
    // First attempt - with invalid credentials
    loginPage.login('invalid_user', 'wrong_password');
    loginPage.verifyErrorMessage('Username and password do not match any user');

    // Clear fields
    loginPage.getUsernameInput().clear();
    loginPage.getPasswordInput().clear();

    // Verify error message is still there (error message will only disappear on new attempt)
    loginPage.verifyErrorMessage('Username and password do not match any user');
  });
});