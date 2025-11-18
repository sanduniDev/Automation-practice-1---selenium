/**
 * Leave Page
 * Page object for OrangeHRM Leave module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class LeavePage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly leavePageTitle: TestElement = {
    locator: By.xpath('//h6[contains(text(), "Leave")]'),
    label: 'Leave Page Title',
  };

  // Top Menu Items
  public readonly applyMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Apply"]'),
    label: 'Apply Menu Item',
  };

  public readonly myLeaveMenuItem: TestElement = {
    locator: By.xpath('//a[text()="My Leave"]'),
    label: 'My Leave Menu Item',
  };

  public readonly entitlementsMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Entitlements "]'),
    label: 'Entitlements Menu Item',
  };

  public readonly reportsMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Reports "]'),
    label: 'Reports Menu Item',
  };

  public readonly configureMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Configure "]'),
    label: 'Configure Menu Item',
  };

  public readonly leaveListMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Leave List"]'),
    label: 'Leave List Menu Item',
  };

  // Apply Leave Form
  public readonly leaveTypeDropdown: TestElement = {
    locator: By.xpath('//label[text()="Leave Type"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Leave Type Dropdown',
  };

  public readonly fromDateInput: TestElement = {
    locator: By.xpath('//label[text()="From Date"]/parent::div/following-sibling::div//input'),
    label: 'From Date Input',
  };

  public readonly toDateInput: TestElement = {
    locator: By.xpath('//label[text()="To Date"]/parent::div/following-sibling::div//input'),
    label: 'To Date Input',
  };

  public readonly commentsTextarea: TestElement = {
    locator: By.xpath('//label[text()="Comments"]/parent::div/following-sibling::div//textarea'),
    label: 'Comments Textarea',
  };

  public readonly applyButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Apply Button',
  };

  public readonly cancelButton: TestElement = {
    locator: By.xpath('//button[text()=" Cancel "]'),
    label: 'Cancel Button',
  };

  // Leave List Search
  public readonly searchFromDateInput: TestElement = {
    locator: By.xpath('(//label[text()="From Date"]/parent::div/following-sibling::div//input)[1]'),
    label: 'Search From Date Input',
  };

  public readonly searchToDateInput: TestElement = {
    locator: By.xpath('(//label[text()="To Date"]/parent::div/following-sibling::div//input)[1]'),
    label: 'Search To Date Input',
  };

  public readonly searchButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Search Button',
  };

  public readonly resetButton: TestElement = {
    locator: By.xpath('//button[text()=" Reset "]'),
    label: 'Reset Button',
  };

  // Leave Status Cards
  public readonly scheduledLeaveCard: TestElement = {
    locator: By.xpath('//p[text()="Scheduled"]'),
    label: 'Scheduled Leave Card',
  };

  public readonly pendingApprovalCard: TestElement = {
    locator: By.xpath('//p[text()="Pending Approval"]'),
    label: 'Pending Approval Card',
  };

  public readonly rejectedCard: TestElement = {
    locator: By.xpath('//p[text()="Rejected"]'),
    label: 'Rejected Card',
  };

  // Results Table
  public readonly recordsFoundText: TestElement = {
    locator: By.xpath('//span[contains(text(), "Record")]'),
    label: 'Records Found Text',
  };

  public readonly firstLeaveRow: TestElement = {
    locator: By.xpath('(//div[@role="table"]//div[@role="row"])[2]'),
    label: 'First Leave Row',
  };

  // Leave Balance Widget
  public readonly leaveBalanceWidget: TestElement = {
    locator: By.xpath('//p[text()="Leave Balance (Days)"]'),
    label: 'Leave Balance Widget',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Navigate to Apply Leave page
   */
  async navigateToApplyLeave(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Apply Leave`);
    await this.clickAfterWaitForElement(this.applyMenuItem);
  }

  /**
   * Navigate to My Leave page
   */
  async navigateToMyLeave(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to My Leave`);
    await this.clickAfterWaitForElement(this.myLeaveMenuItem);
  }

  /**
   * Navigate to Leave List page
   */
  async navigateToLeaveList(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Leave List`);
    await this.clickAfterWaitForElement(this.leaveListMenuItem);
  }

  /**
   * Select leave type from dropdown
   */
  async selectLeaveType(leaveType: string): Promise<void> {
    console.log(`📋 ${this.sessionName} Selecting leave type: ${leaveType}`);
    await this.clickAfterWaitForElement(this.leaveTypeDropdown);
    const typeOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${leaveType}"]`),
      label: `${leaveType} Option`,
    };
    await this.clickAfterWaitForElement(typeOption);
  }

  /**
   * Fill in leave dates
   */
  async fillLeaveDates(fromDate: string, toDate: string): Promise<void> {
    console.log(`📅 ${this.sessionName} Filling leave dates: ${fromDate} to ${toDate}`);
    await this.clearAndTypeAfterWaitForElement(this.fromDateInput, fromDate);
    await this.clearAndTypeAfterWaitForElement(this.toDateInput, toDate);
  }

  /**
   * Add comments to leave request
   */
  async addComments(comments: string): Promise<void> {
    console.log(`💬 ${this.sessionName} Adding comments: ${comments}`);
    await this.typeAfterWaitForElement(this.commentsTextarea, comments);
  }

  /**
   * Submit leave application
   */
  async submitLeaveApplication(leaveType: string, fromDate: string, toDate: string, comments?: string): Promise<void> {
    console.log(`📝 ${this.sessionName} Submitting leave application`);

    await this.selectLeaveType(leaveType);
    await this.fillLeaveDates(fromDate, toDate);

    if (comments) {
      await this.addComments(comments);
    }

    await this.clickAfterWaitForElement(this.applyButton);
    console.log(`✅ ${this.sessionName} Leave application submitted`);
  }

  /**
   * Search leave by date range
   */
  async searchLeaveByDateRange(fromDate: string, toDate: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching leave from ${fromDate} to ${toDate}`);
    await this.clearAndTypeAfterWaitForElement(this.searchFromDateInput, fromDate);
    await this.clearAndTypeAfterWaitForElement(this.searchToDateInput, toDate);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
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
   * Verify Leave page is displayed
   */
  async isLeavePageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Leave page is displayed`);
    return await this.isElementPresent(this.leavePageTitle);
  }

  /**
   * Get records found count
   */
  async getRecordsCount(): Promise<string> {
    console.log(`📊 ${this.sessionName} Getting records count`);
    return await this.extractTextAfterWaitForElement(this.recordsFoundText);
  }

  /**
   * Verify leave balance widget is displayed
   */
  async isLeaveBalanceDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying leave balance is displayed`);
    return await this.isElementPresent(this.leaveBalanceWidget);
  }

  /**
   * Get scheduled leave count
   */
  async getScheduledLeaveCount(): Promise<string> {
    const scheduledElement: TestElement = {
      locator: By.xpath('//p[text()="Scheduled"]/following-sibling::p'),
      label: 'Scheduled Count',
    };
    return await this.extractTextAfterWaitForElement(scheduledElement);
  }

  /**
   * Get pending approval count
   */
  async getPendingApprovalCount(): Promise<string> {
    const pendingElement: TestElement = {
      locator: By.xpath('//p[text()="Pending Approval"]/following-sibling::p'),
      label: 'Pending Approval Count',
    };
    return await this.extractTextAfterWaitForElement(pendingElement);
  }
}
