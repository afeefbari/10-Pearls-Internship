/**
 * LoginPage - Page Object Model for SauceDemo login page
 * Handles all login-related interactions and assertions
 */
class LoginPage {
  // Locators
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorMessage = '[data-test="error"]';
  loginContainer = '.login_container';

  /**
   * Navigate to the login page
   */
  navigate() {
    cy.visit('/');
  }

  /**
   * Enter username
   * @param {string} username - The username to enter
   */
  enterUsername(username) {
    cy.get(this.usernameInput).clear();
    if (username) {
      cy.get(this.usernameInput).type(username);
    }
  }

  /**
   * Enter password
   * @param {string} password - The password to enter
   */
  enterPassword(password) {
    cy.get(this.passwordInput).clear();
    if (password) {
      cy.get(this.passwordInput).type(password);
    }
  }

  /**
   * Click the login button
   */
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  /**
   * Perform login with username and password
   * @param {string} username - The username
   * @param {string} password - The password
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedError - The expected error message
   */
  verifyErrorMessage(expectedError) {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain', expectedError);
  }

  /**
   * Verify error message is not displayed
   */
  verifyNoErrorMessage() {
    cy.get(this.errorMessage).should('not.exist');
  }

  /**
   * Verify login page is displayed
   */
  verifyLoginPageDisplayed() {
    cy.get(this.loginContainer).should('be.visible');
    cy.get(this.usernameInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.loginButton).should('be.visible');
  }

  /**
   * Check if username input has focus
   */
  getUsernameInput() {
    return cy.get(this.usernameInput);
  }

  /**
   * Check if password input has focus
   */
  getPasswordInput() {
    return cy.get(this.passwordInput);
  }
}

module.exports = LoginPage;
