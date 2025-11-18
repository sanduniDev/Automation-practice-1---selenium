/**
 * Login Page
 * Page object for OrangeHRM login page
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class LoginPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly usernameInput: TestElement = {
    locator: By.name('username'),
    label: 'Username Input',
  };

  public readonly passwordInput: TestElement = {
    locator: By.name('password'),
    label: 'Password Input',
  };

  public readonly loginButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Login Button',
  };

  public readonly loginTitle: TestElement = {
    locator: By.xpath('//h5[text()="Login"]'),
    label: 'Login Title',
  };

  public readonly errorMessage: TestElement = {
    locator: By.xpath('//p[contains(@class, "oxd-alert-content-text")]'),
    label: 'Error Message',
  };

  public readonly forgotPasswordLink: TestElement = {
    locator: By.xpath('//p[contains(@class, "orangehrm-login-forgot")]'),
    label: 'Forgot Password Link',
  };

  public readonly logoImage: TestElement = {
    locator: By.xpath('//img[@alt="company-branding"]'),
    label: 'Company Logo',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Perform login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    console.log(`🔐 ${this.sessionName} Logging in as: ${username}`);

    await this.typeAfterWaitForElement(this.usernameInput, username);
    await this.typeAfterWaitForElement(this.passwordInput, password);
    await this.clickAfterWaitForElement(this.loginButton);

    console.log(`✅ ${this.sessionName} Login submitted`);
  }

  /**
   * Clear login form
   */
  async clearLoginForm(): Promise<void> {
    console.log(`🧹 ${this.sessionName} Clearing login form`);
    await this.clearAndTypeAfterWaitForElement(this.usernameInput, '');
    await this.clearAndTypeAfterWaitForElement(this.passwordInput, '');
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Clicking forgot password link`);
    await this.clickAfterWaitForElement(this.forgotPasswordLink);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying login page is displayed`);
    return await this.isElementPresent(this.loginTitle);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    console.log(`📝 ${this.sessionName} Getting error message`);
    return await this.extractTextAfterWaitForElement(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    console.log(`❌ ${this.sessionName} Checking if error message is displayed`);
    return await this.isElementPresent(this.errorMessage);
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(): Promise<boolean> {
    const title = await this.getTitle();
    console.log(`📄 ${this.sessionName} Page title: ${title}`);
    return title.includes('OrangeHRM');
  }
}
