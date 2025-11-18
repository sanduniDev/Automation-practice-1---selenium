/**
 * PIM Module Test Suite
 * Tests for employee management functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('PIM Module Tests', () => {
  let testContext: TestContext;
  const testEmployeeId = `EMP${Date.now()}`;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'PIMSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to PIM
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToPIM();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC023: Should display PIM page', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    const isPimPageDisplayed = await pages.pim.isPimPageDisplayed();
    expect(isPimPageDisplayed).toBe(true);
  });

  it('TC024: Should display employee records', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    await pages.pim.sleep(2000);
    const recordsCount = await pages.pim.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC025: Should search employee by ID', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    // Search for a common employee ID (assuming 0001 exists)
    await pages.pim.searchEmployeeById('0001');
    await pages.pim.sleep(2000);

    const recordsCount = await pages.pim.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC026: Should reset search form', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    await pages.pim.searchEmployeeById('0001');
    await pages.pim.sleep(1000);
    await pages.pim.resetSearch();
    await pages.pim.sleep(1000);

    const isPimPageDisplayed = await pages.pim.isPimPageDisplayed();
    expect(isPimPageDisplayed).toBe(true);
  });

  it('TC027: Should open Add Employee form', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    await pages.pim.clickAddEmployee();
    await pages.pim.sleep(1000);

    const isFormDisplayed = await pages.pim.isElementPresent(pages.pim.firstNameInput);
    expect(isFormDisplayed).toBe(true);
  });

  it('TC028: Should add new employee without login', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    await pages.pim.clickAddEmployee();
    await pages.pim.sleep(1000);

    await pages.pim.addEmployee('John', 'A', 'Doe', testEmployeeId);
    await pages.pim.sleep(3000);

    // Verify we're on employee details page
    const currentUrl = await pages.pim.getCurrentUrl();
    expect(currentUrl).toContain('empNumber');
  });

  it('TC029: Should navigate to Contact Details tab', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    // Navigate back to PIM
    await pages.dashboard.navigateToPIM();
    await pages.pim.sleep(2000);

    // View first employee
    await pages.pim.viewFirstEmployee();
    await pages.pim.sleep(2000);

    await pages.pim.navigateToContactDetails();
    await pages.pim.sleep(1000);

    const currentUrl = await pages.pim.getCurrentUrl();
    expect(currentUrl).toContain('contactDetails');
  });

  it('TC030: Should search and view employee', async () => {
    const session = testContext.getSessionByName('PIMSession');
    const { pages } = session;

    // Navigate back to PIM list
    await pages.dashboard.navigateToPIM();
    await pages.pim.sleep(2000);

    // Search and view first result
    await pages.pim.searchEmployeeById(testEmployeeId);
    await pages.pim.sleep(2000);

    const recordsCount = await pages.pim.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });
});
