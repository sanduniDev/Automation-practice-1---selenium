/**
 * Admin Module Test Suite
 * Tests for admin user management functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Admin Module Tests', () => {
  let testContext: TestContext;
  const testUsername = `testuser_${Date.now()}`;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'AdminSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to Admin
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToAdmin();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC016: Should display admin page', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    const isAdminPageDisplayed = await pages.admin.isAdminPageDisplayed();
    expect(isAdminPageDisplayed).toBe(true);
  });

  it('TC017: Should search for existing user', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    await pages.admin.searchUserByUsername('Admin');
    await pages.admin.sleep(2000);

    const isUserInResults = await pages.admin.isUserInResults('Admin');
    expect(isUserInResults).toBe(true);
  });

  it('TC018: Should display records count after search', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    await pages.admin.searchUserByUsername('Admin');
    await pages.admin.sleep(2000);

    const recordsCount = await pages.admin.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC019: Should reset search form', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    await pages.admin.searchUserByUsername('Admin');
    await pages.admin.sleep(1000);
    await pages.admin.resetSearch();
    await pages.admin.sleep(1000);

    // Verify form is cleared (page should still display user list)
    const isAdminPageDisplayed = await pages.admin.isAdminPageDisplayed();
    expect(isAdminPageDisplayed).toBe(true);
  });

  it('TC020: Should open Add User form', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    await pages.admin.clickAddUser();
    await pages.admin.sleep(1000);

    const isFormDisplayed = await pages.admin.isElementPresent(pages.admin.userRoleFormDropdown);
    expect(isFormDisplayed).toBe(true);
  });

  it('TC021: Should navigate back to user list', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    await pages.admin.clickAddUser();
    await pages.admin.sleep(1000);

    // Click cancel
    await pages.admin.clickAfterWaitForElement(pages.admin.cancelButton);
    await pages.admin.sleep(1000);

    const isAdminPageDisplayed = await pages.admin.isAdminPageDisplayed();
    expect(isAdminPageDisplayed).toBe(true);
  });

  it('TC022: Should verify user list has records', async () => {
    const session = testContext.getSessionByName('AdminSession');
    const { pages } = session;

    // Navigate to admin page
    await pages.dashboard.navigateToAdmin();
    await pages.admin.sleep(2000);

    const recordsCount = await pages.admin.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });
});
