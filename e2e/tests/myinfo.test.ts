/**
 * My Info Module Test Suite
 * Tests for personal information management functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('My Info Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'MyInfoSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to My Info
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToMyInfo();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC054: Should display My Info page', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.sleep(2000);
    const isMyInfoPageDisplayed = await pages.myInfo.isMyInfoPageDisplayed();
    expect(isMyInfoPageDisplayed).toBe(true);
  });

  it('TC055: Should display personal details form', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.sleep(2000);
    const isFirstNameDisplayed = await pages.myInfo.isElementPresent(pages.myInfo.firstNameInput);
    expect(isFirstNameDisplayed).toBe(true);
  });

  it('TC056: Should get first name value', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.sleep(2000);
    const firstName = await pages.myInfo.getFirstName();
    expect(firstName).not.toBe('');
  });

  it('TC057: Should get employee ID', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.sleep(2000);
    const employeeId = await pages.myInfo.getEmployeeId();
    expect(employeeId).not.toBe('');
  });

  it('TC058: Should navigate to Contact Details tab', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.navigateToContactDetails();
    await pages.myInfo.sleep(2000);

    const currentUrl = await pages.myInfo.getCurrentUrl();
    expect(currentUrl).toContain('contactDetails');
  });

  it('TC059: Should display contact details form', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.navigateToContactDetails();
    await pages.myInfo.sleep(2000);

    const isStreetDisplayed = await pages.myInfo.isElementPresent(pages.myInfo.street1Input);
    expect(isStreetDisplayed).toBe(true);
  });

  it('TC060: Should navigate to Emergency Contacts tab', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.navigateToEmergencyContacts();
    await pages.myInfo.sleep(2000);

    const currentUrl = await pages.myInfo.getCurrentUrl();
    expect(currentUrl).toContain('emergencyContacts');
  });

  it('TC061: Should display add emergency contact button', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.navigateToEmergencyContacts();
    await pages.myInfo.sleep(2000);

    const isButtonDisplayed = await pages.myInfo.isElementPresent(pages.myInfo.addEmergencyContactButton);
    expect(isButtonDisplayed).toBe(true);
  });

  it('TC062: Should navigate to Qualifications tab', async () => {
    const session = testContext.getSessionByName('MyInfoSession');
    const { pages } = session;

    await pages.myInfo.navigateToQualifications();
    await pages.myInfo.sleep(2000);

    const currentUrl = await pages.myInfo.getCurrentUrl();
    expect(currentUrl).toContain('qualifications');
  });
});
