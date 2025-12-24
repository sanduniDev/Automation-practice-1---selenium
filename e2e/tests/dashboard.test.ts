/**
 * Dashboard Test Suite
 * Tests for dashboard functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Dashboard Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'DashboardSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login before running dashboard tests
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC007: Should display dashboard title', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    const isDashboardDisplayed = await pages.dashboard.isDashboardDisplayed();
    expect(isDashboardDisplayed).toBe(true);
  });

  it('TC008: Should verify user is logged in', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    const isUserLoggedIn = await pages.dashboard.isUserLoggedIn();
    expect(isUserLoggedIn).toBe(true);
  });

  it('TC009: Should display dashboard widgets', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    const widgetsCount = await pages.dashboard.getWidgetsCount();
    expect(widgetsCount).toBeGreaterThan(0);
  });

  it('TC010: Should navigate to Admin module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToAdmin();
    await pages.admin.waitForUrlContains('admin');

    const isAdminPageDisplayed = await pages.admin.isAdminPageDisplayed();
    expect(isAdminPageDisplayed).toBe(true);
  });

  it('TC011: Should navigate to PIM module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToPIM();
    await pages.pim.waitForUrlContains('pim');

    const isPimPageDisplayed = await pages.pim.isPimPageDisplayed();
    expect(isPimPageDisplayed).toBe(true);
  });

  it('TC012: Should navigate to Leave module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToLeave();
    await pages.leave.waitForUrlContains('leave');

    // Add delay to allow page to fully load
    const { CommonUtils } = await import('../utils/common-utils.js');
    await CommonUtils.delay(2000, 'Wait for Leave page to load');

    const isLeavePageDisplayed = await pages.leave.isLeavePageDisplayed();
    expect(isLeavePageDisplayed).toBe(true);
  });

  it('TC013: Should navigate to Time module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToTime();
    await pages.time.waitForUrlContains('time');

    // Add delay to allow page to fully load
    const { CommonUtils } = await import('../utils/common-utils.js');
    await CommonUtils.delay(2000, 'Wait for Time page to load');

    const isTimePageDisplayed = await pages.time.isTimePageDisplayed();
    expect(isTimePageDisplayed).toBe(true);
  });

  it('TC014: Should navigate to Recruitment module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToRecruitment();
    await pages.recruitment.waitForUrlContains('recruitment');

    const isRecruitmentPageDisplayed = await pages.recruitment.isRecruitmentPageDisplayed();
    expect(isRecruitmentPageDisplayed).toBe(true);
  });

  it('TC015: Should navigate to My Info module', async () => {
    const session = testContext.getSessionByName('DashboardSession');
    const { pages } = session;

    await pages.dashboard.navigateToMyInfo();
    await pages.myInfo.waitForUrlContains('myinfo');

    const isMyInfoPageDisplayed = await pages.myInfo.isMyInfoPageDisplayed();
    expect(isMyInfoPageDisplayed).toBe(true);
  });
});
