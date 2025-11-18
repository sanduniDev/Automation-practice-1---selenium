/**
 * Login Test Suite
 * Tests for login functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { By } from 'selenium-webdriver';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Login Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    // Create browser session
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'LoginSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });
  });

  afterAll(async () => {
    // Close browser
    await testContext.quitAllSessions();
  });

  // Helper function to logout if user is logged in
  async function ensureLoggedOut() {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    try {
      // Check if user dropdown is present (means user is logged in)
      const isLoggedIn = await pages.dashboard.isUserLoggedIn();
      if (isLoggedIn) {
        console.log('🚪 User is logged in, logging out...');
        await pages.dashboard.logout();
        await pages.login.sleep(2000);
      }
    } catch (error) {
      // User is not logged in, continue
      console.log('✅ User is not logged in, continuing...');
    }
  }

  it('TC001: Should load login page successfully', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    await pages.login.visit(TestConfig.loginPageUrl);

    const isDisplayed = await pages.login.isLoginPageDisplayed();
    expect(isDisplayed).toBe(true);

    const title = await pages.login.verifyPageTitle();
    expect(title).toBe(true);
  });

  it('TC002: Should login with valid credentials', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);

    // Wait for dashboard
    await pages.dashboard.waitForUrlContains('dashboard');

    const isDashboardDisplayed = await pages.dashboard.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);

    const isUserLoggedIn = await pages.dashboard.isUserLoggedIn();
    expect(isUserLoggedIn).toBe(true);
  });

  it('TC003: Should show error with invalid username', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    // Ensure user is logged out first
    await ensureLoggedOut();

    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login('InvalidUser', TestConfig.adminPassword);

    const isErrorDisplayed = await pages.login.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);

    const errorMessage = await pages.login.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  it('TC004: Should show error with invalid password', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    // Ensure user is logged out first
    await ensureLoggedOut();

    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, 'InvalidPassword123');

    const isErrorDisplayed = await pages.login.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);

    const errorMessage = await pages.login.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  it('TC005: Should show error with empty credentials', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    // Ensure user is logged out first
    await ensureLoggedOut();

    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login('', '');

    const isUsernameRequired = await pages.login.isElementPresent({
      locator: By.xpath('//span[text()="Required"]'),
      label: 'Required field error',
    });
    expect(isUsernameRequired).toBe(true);
  });

  it('TC006: Should logout successfully', async () => {
    const session = testContext.getSessionByName('LoginSession');
    const { pages } = session;

    // Ensure user is logged out first
    await ensureLoggedOut();

    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);

    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.logout();

    await pages.login.waitForUrlContains('login');
    const isLoginPageDisplayed = await pages.login.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
  });
});
