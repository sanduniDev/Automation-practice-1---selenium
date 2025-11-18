/**
 * Leave Module Test Suite
 * Tests for leave management functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Leave Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'LeaveSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to Leave
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToLeave();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC031: Should display Leave page', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    const isLeavePageDisplayed = await pages.leave.isLeavePageDisplayed();
    expect(isLeavePageDisplayed).toBe(true);
  });

  it('TC032: Should navigate to Apply Leave', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToApplyLeave();
    await pages.leave.sleep(2000);

    const currentUrl = await pages.leave.getCurrentUrl();
    expect(currentUrl).toContain('applyLeave');
  });

  it('TC033: Should display leave balance', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToApplyLeave();
    await pages.leave.sleep(2000);

    const isLeaveBalanceDisplayed = await pages.leave.isLeaveBalanceDisplayed();
    expect(isLeaveBalanceDisplayed).toBe(true);
  });

  it('TC034: Should navigate to My Leave', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToMyLeave();
    await pages.leave.sleep(2000);

    const currentUrl = await pages.leave.getCurrentUrl();
    expect(currentUrl).toContain('myLeave');
  });

  it('TC035: Should navigate to Leave List', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToLeaveList();
    await pages.leave.sleep(2000);

    const currentUrl = await pages.leave.getCurrentUrl();
    expect(currentUrl).toContain('leaveList');
  });

  it('TC036: Should display leave records', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToLeaveList();
    await pages.leave.sleep(2000);

    const recordsCount = await pages.leave.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC037: Should search leave by date range', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.navigateToLeaveList();
    await pages.leave.sleep(1000);

    const today = new Date();
    const fromDate = today.toISOString().split('T')[0];
    const toDate = new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0];

    await pages.leave.searchLeaveByDateRange(fromDate, toDate);
    await pages.leave.sleep(2000);

    const recordsCount = await pages.leave.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC038: Should reset leave search', async () => {
    const session = testContext.getSessionByName('LeaveSession');
    const { pages } = session;

    await pages.leave.resetSearch();
    await pages.leave.sleep(1000);

    const isLeavePageDisplayed = await pages.leave.isLeavePageDisplayed();
    expect(isLeavePageDisplayed).toBe(true);
  });
});
