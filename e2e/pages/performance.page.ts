/**
 * Performance Page
 * Page object for OrangeHRM Performance module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class PerformancePage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly performancePageTitle: TestElement = {
    locator: By.xpath('//h6[contains(text(), "Performance")]'),
    label: 'Performance Page Title',
  };

  // Top Menu Items
  public readonly configureMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Configure "]'),
    label: 'Configure Menu Item',
  };

  public readonly manageReviewsMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Manage Reviews "]'),
    label: 'Manage Reviews Menu Item',
  };

  public readonly manageReviewsSubMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Manage Reviews"]'),
    label: 'Manage Reviews Submenu Item',
  };

  public readonly myReviewsMenuItem: TestElement = {
    locator: By.xpath('//a[text()="My Reviews"]'),
    label: 'My Reviews Menu Item',
  };

  public readonly reviewListMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Review List"]'),
    label: 'Review List Menu Item',
  };

  // Search Section
  public readonly employeeNameInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div//input'),
    label: 'Employee Name Input',
  };

  public readonly jobTitleDropdown: TestElement = {
    locator: By.xpath('//label[text()="Job Title"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Job Title Dropdown',
  };

  public readonly statusDropdown: TestElement = {
    locator: By.xpath('//label[text()="Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Status Dropdown',
  };

  public readonly fromDateInput: TestElement = {
    locator: By.xpath('//label[text()="From"]/parent::div/following-sibling::div//input'),
    label: 'From Date Input',
  };

  public readonly toDateInput: TestElement = {
    locator: By.xpath('//label[text()="To"]/parent::div/following-sibling::div//input'),
    label: 'To Date Input',
  };

  public readonly searchButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Search Button',
  };

  public readonly resetButton: TestElement = {
    locator: By.xpath('//button[text()=" Reset "]'),
    label: 'Reset Button',
  };

  // Results Table
  public readonly recordsFoundText: TestElement = {
    locator: By.xpath('//span[contains(text(), "Record")]'),
    label: 'Records Found Text',
  };

  public readonly firstReviewLink: TestElement = {
    locator: By.xpath('(//div[@role="table"]//div[@role="row"])[2]//div[@role="cell"][2]'),
    label: 'First Review Link',
  };

  // Performance Trackers
  public readonly performanceTrackersTitle: TestElement = {
    locator: By.xpath('//h6[text()="Performance Trackers"]'),
    label: 'Performance Trackers Title',
  };

  public readonly addTrackerButton: TestElement = {
    locator: By.xpath('//button[text()=" Add "]'),
    label: 'Add Tracker Button',
  };

  // KPIs (Key Performance Indicators)
  public readonly kpiTitle: TestElement = {
    locator: By.xpath('//h6[text()="Key Performance Indicators for Job Title"]'),
    label: 'KPI Title',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Navigate to Configure menu
   */
  async navigateToConfigure(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Configure`);
    await this.clickAfterWaitForElement(this.configureMenuItem);
  }

  /**
   * Navigate to Manage Reviews
   */
  async navigateToManageReviews(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Manage Reviews`);
    await this.clickAfterWaitForElement(this.manageReviewsMenuItem);
    await this.clickAfterWaitForElement(this.manageReviewsSubMenuItem);
  }

  /**
   * Navigate to My Reviews
   */
  async navigateToMyReviews(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to My Reviews`);
    await this.clickAfterWaitForElement(this.myReviewsMenuItem);
  }

  /**
   * Search reviews by employee name
   */
  async searchReviewByEmployeeName(employeeName: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for employee: ${employeeName}`);
    await this.typeAfterWaitForElement(this.employeeNameInput, employeeName);
    await this.sleep(2000); // Wait for autocomplete

    const firstOption: TestElement = {
      locator: By.xpath('//div[@role="option"][1]'),
      label: 'First Employee Option',
    };
    await this.clickAfterWaitForElement(firstOption);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Search reviews by date range
   */
  async searchReviewByDateRange(fromDate: string, toDate: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching reviews from ${fromDate} to ${toDate}`);
    await this.clearAndTypeAfterWaitForElement(this.fromDateInput, fromDate);
    await this.clearAndTypeAfterWaitForElement(this.toDateInput, toDate);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Select status from dropdown
   */
  async selectStatus(status: string): Promise<void> {
    console.log(`📊 ${this.sessionName} Selecting status: ${status}`);
    await this.clickAfterWaitForElement(this.statusDropdown);
    const statusOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${status}"]`),
      label: `${status} Option`,
    };
    await this.clickAfterWaitForElement(statusOption);
  }

  /**
   * View first review details
   */
  async viewFirstReview(): Promise<void> {
    console.log(`👁️ ${this.sessionName} Viewing first review details`);
    await this.clickAfterWaitForElement(this.firstReviewLink);
  }

  /**
   * Reset search form
   */
  async resetSearch(): Promise<void> {
    console.log(`🔄 ${this.sessionName} Resetting search`);
    await this.clickAfterWaitForElement(this.resetButton);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify Performance page is displayed
   */
  async isPerformancePageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Performance page is displayed`);
    return await this.isElementPresent(this.performancePageTitle);
  }

  /**
   * Get records found count
   */
  async getRecordsCount(): Promise<string> {
    console.log(`📊 ${this.sessionName} Getting records count`);
    return await this.extractTextAfterWaitForElement(this.recordsFoundText);
  }

  /**
   * Verify review exists in search results
   */
  async isReviewInResults(employeeName: string): Promise<boolean> {
    const reviewElement: TestElement = {
      locator: By.xpath(`//div[contains(@class, "oxd-table-cell") and contains(text(), "${employeeName}")]`),
      label: `Review for ${employeeName} in results`,
    };
    return await this.isElementPresent(reviewElement);
  }

  /**
   * Verify Performance Trackers page is displayed
   */
  async isPerformanceTrackersDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Performance Trackers is displayed`);
    return await this.isElementPresent(this.performanceTrackersTitle);
  }
}
