/**
 * Recruitment Module Test Suite
 * Tests for recruitment and candidate management functionality
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { TestHelpers } from '../helpers/test-helpers.js';
import { TestContext } from '../types/test-context.js';
import { BrowserTypes } from '../service/definitions/browser-types.js';
import { TestConfig } from '../config/test-config.js';

describe('Recruitment Module Tests', () => {
  let testContext: TestContext;

  beforeAll(async () => {
    testContext = await TestHelpers.createTestContext({
      sessionsOptions: [
        {
          sessionName: 'RecruitmentSession',
          browserType: BrowserTypes.CHROME,
        },
      ],
    });

    // Login and navigate to Recruitment
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;
    await pages.login.visit(TestConfig.loginPageUrl);
    await pages.login.login(TestConfig.adminUsername, TestConfig.adminPassword);
    await pages.dashboard.waitForUrlContains('dashboard');
    await pages.dashboard.navigateToRecruitment();
  });

  afterAll(async () => {
    await testContext.quitAllSessions();
  });

  it('TC046: Should display Recruitment page', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.sleep(2000);
    const isRecruitmentPageDisplayed = await pages.recruitment.isRecruitmentPageDisplayed();
    expect(isRecruitmentPageDisplayed).toBe(true);
  });

  it('TC047: Should display candidate records', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.sleep(2000);
    const recordsCount = await pages.recruitment.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC048: Should navigate to Candidates page', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.navigateToCandidates();
    await pages.recruitment.sleep(2000);

    const currentUrl = await pages.recruitment.getCurrentUrl();
    expect(currentUrl).toContain('viewCandidates');
  });

  it('TC049: Should navigate to Vacancies page', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.navigateToVacancies();
    await pages.recruitment.sleep(2000);

    const currentUrl = await pages.recruitment.getCurrentUrl();
    expect(currentUrl).toContain('viewJobVacancy');
  });

  it('TC050: Should open Add Candidate form', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.navigateToCandidates();
    await pages.recruitment.sleep(1000);

    await pages.recruitment.clickAddCandidate();
    await pages.recruitment.sleep(1000);

    const isFormDisplayed = await pages.recruitment.isElementPresent(pages.recruitment.firstNameInput);
    expect(isFormDisplayed).toBe(true);
  });

  it('TC051: Should cancel add candidate', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.navigateToCandidates();
    await pages.recruitment.sleep(1000);

    await pages.recruitment.clickAddCandidate();
    await pages.recruitment.sleep(1000);

    await pages.recruitment.clickAfterWaitForElement(pages.recruitment.cancelButton);
    await pages.recruitment.sleep(1000);

    const isRecruitmentPageDisplayed = await pages.recruitment.isRecruitmentPageDisplayed();
    expect(isRecruitmentPageDisplayed).toBe(true);
  });

  it('TC052: Should search candidate by keywords', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.navigateToCandidates();
    await pages.recruitment.sleep(1000);

    await pages.recruitment.searchCandidateByKeywords('developer');
    await pages.recruitment.sleep(2000);

    const recordsCount = await pages.recruitment.getRecordsCount();
    expect(recordsCount).toContain('Record');
  });

  it('TC053: Should reset candidate search', async () => {
    const session = testContext.getSessionByName('RecruitmentSession');
    const { pages } = session;

    await pages.recruitment.searchCandidateByKeywords('developer');
    await pages.recruitment.sleep(1000);

    await pages.recruitment.resetSearch();
    await pages.recruitment.sleep(1000);

    const isRecruitmentPageDisplayed = await pages.recruitment.isRecruitmentPageDisplayed();
    expect(isRecruitmentPageDisplayed).toBe(true);
  });
});
