/**
 * Time Module Test Suite
 * Tests for time tracking and attendance functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Time Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'TimeSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to Time
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToTime();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC039: Should display Time page', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    const isTimePageDisplayed = await pages.time.isTimePageDisplayed();
    expect(isTimePageDisplayed).toBe(true);
  });

  it('TC040: Should navigate to My Timesheets', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToMyTimesheets();
    await pages.time.sleep(2000);

    const currentUrl = await pages.time.getCurrentUrl();
    expect(currentUrl).toContain('viewMyTimesheet');
  });

  it('TC041: Should display timesheet period', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToMyTimesheets();
    await pages.time.sleep(2000);

    const period = await pages.time.getTimesheetPeriod();
    expect(period).not.toBe('');
  });

  it('TC042: Should navigate to Punch In/Out', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToPunchInOut();
    await pages.time.sleep(2000);

    const currentUrl = await pages.time.getCurrentUrl();
    expect(currentUrl).toContain('punchIn');
  });

  it('TC043: Should display Punch In or Punch Out button', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToPunchInOut();
    await pages.time.sleep(2000);

    // Either Punch In or Punch Out button should be displayed
    const isPunchInDisplayed = await pages.time.isPunchInButtonDisplayed();
    const isPunchOutDisplayed = await pages.time.isPunchOutButtonDisplayed();

    expect(isPunchInDisplayed || isPunchOutDisplayed).toBe(true);
  });

  it('TC044: Should navigate to My Records', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToMyRecords();
    await pages.time.sleep(2000);

    const currentUrl = await pages.time.getCurrentUrl();
    expect(currentUrl).toContain('myAttendanceRecord');
  });

  it('TC045: Should display attendance records section', async () => {
    const session = testContext.getSessionByName('TimeSession');
    const { pages } = session;

    await pages.time.navigateToMyRecords();
    await pages.time.sleep(2000);

    const isTimePageDisplayed = await pages.time.isTimePageDisplayed();
    expect(isTimePageDisplayed).toBe(true);
  });
});
