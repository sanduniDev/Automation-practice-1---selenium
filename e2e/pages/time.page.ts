/**
 * Time Page
 * Page object for OrangeHRM Time module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class TimePage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly timePageTitle: TestElement = {
    locator: By.xpath('//h6[contains(text(), "Time")]'),
    label: 'Time Page Title',
  };

  // Top Menu Items
  public readonly timesheetsMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Timesheets "]'),
    label: 'Timesheets Menu Item',
  };

  public readonly myTimesheetMenuItem: TestElement = {
    locator: By.xpath('//a[text()="My Timesheets"]'),
    label: 'My Timesheet Menu Item',
  };

  public readonly employeeTimesheetsMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Employee Timesheets"]'),
    label: 'Employee Timesheets Menu Item',
  };

  public readonly attendanceMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Attendance "]'),
    label: 'Attendance Menu Item',
  };

  public readonly myRecordsMenuItem: TestElement = {
    locator: By.xpath('//a[text()="My Records"]'),
    label: 'My Records Menu Item',
  };

  public readonly punchInOutMenuItem: TestElement = {
    locator: By.xpath('//a[text()="Punch In/Out"]'),
    label: 'Punch In/Out Menu Item',
  };

  public readonly reportsMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Reports "]'),
    label: 'Reports Menu Item',
  };

  // Timesheet Elements
  public readonly editButton: TestElement = {
    locator: By.xpath('//button[text()=" Edit "]'),
    label: 'Edit Timesheet Button',
  };

  public readonly projectNameDropdown: TestElement = {
    locator: By.xpath('//label[text()="Project Name"]/parent::div/following-sibling::div//input'),
    label: 'Project Name Dropdown',
  };

  public readonly activityDropdown: TestElement = {
    locator: By.xpath('//label[text()="Activity"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Activity Dropdown',
  };

  public readonly saveButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Save Button',
  };

  // Punch In/Out Elements
  public readonly punchInButton: TestElement = {
    locator: By.xpath('//button[text()=" In "]'),
    label: 'Punch In Button',
  };

  public readonly punchOutButton: TestElement = {
    locator: By.xpath('//button[text()=" Out "]'),
    label: 'Punch Out Button',
  };

  public readonly noteTextarea: TestElement = {
    locator: By.xpath('//textarea'),
    label: 'Punch In/Out Note',
  };

  public readonly attendanceRecords: TestElement = {
    locator: By.xpath('//div[@class="orangehrm-attendance-card"]'),
    label: 'Attendance Records',
  };

  // Timesheet Status
  public readonly timesheetPeriod: TestElement = {
    locator: By.xpath('//input[@class="oxd-input oxd-input--active"]'),
    label: 'Timesheet Period',
  };

  public readonly timesheetStatus: TestElement = {
    locator: By.xpath('//p[contains(@class, "timesheet-status")]'),
    label: 'Timesheet Status',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Navigate to My Timesheets
   */
  async navigateToMyTimesheets(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to My Timesheets`);
    await this.clickAfterWaitForElement(this.timesheetsMenuItem);
    await this.clickAfterWaitForElement(this.myTimesheetMenuItem);
  }

  /**
   * Navigate to Punch In/Out
   */
  async navigateToPunchInOut(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Punch In/Out`);
    await this.clickAfterWaitForElement(this.attendanceMenuItem);
    await this.clickAfterWaitForElement(this.punchInOutMenuItem);
  }

  /**
   * Navigate to My Records
   */
  async navigateToMyRecords(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to My Records`);
    await this.clickAfterWaitForElement(this.attendanceMenuItem);
    await this.clickAfterWaitForElement(this.myRecordsMenuItem);
  }

  /**
   * Click Edit on timesheet
   */
  async clickEditTimesheet(): Promise<void> {
    console.log(`✏️ ${this.sessionName} Clicking Edit Timesheet`);
    await this.clickAfterWaitForElement(this.editButton);
  }

  /**
   * Punch In
   */
  async punchIn(note?: string): Promise<void> {
    console.log(`👆 ${this.sessionName} Punching In`);

    if (note) {
      await this.typeAfterWaitForElement(this.noteTextarea, note);
    }

    await this.clickAfterWaitForElement(this.punchInButton);
    console.log(`✅ ${this.sessionName} Punched In successfully`);
  }

  /**
   * Punch Out
   */
  async punchOut(note?: string): Promise<void> {
    console.log(`👆 ${this.sessionName} Punching Out`);

    if (note) {
      await this.typeAfterWaitForElement(this.noteTextarea, note);
    }

    await this.clickAfterWaitForElement(this.punchOutButton);
    console.log(`✅ ${this.sessionName} Punched Out successfully`);
  }

  /**
   * Add timesheet entry
   */
  async addTimesheetEntry(project: string, activity: string, hours: string[]): Promise<void> {
    console.log(`📝 ${this.sessionName} Adding timesheet entry for project: ${project}`);

    // Type project name
    await this.typeAfterWaitForElement(this.projectNameDropdown, project);
    await this.sleep(2000); // Wait for autocomplete

    const firstProjectOption: TestElement = {
      locator: By.xpath('//div[@role="option"][1]'),
      label: 'First Project Option',
    };
    await this.clickAfterWaitForElement(firstProjectOption);

    // Select activity
    await this.clickAfterWaitForElement(this.activityDropdown);
    const activityOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${activity}"]`),
      label: `${activity} Option`,
    };
    await this.clickAfterWaitForElement(activityOption);

    console.log(`✅ ${this.sessionName} Timesheet entry added`);
  }

  /**
   * Save timesheet
   */
  async saveTimesheet(): Promise<void> {
    console.log(`💾 ${this.sessionName} Saving timesheet`);
    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} Timesheet saved`);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify Time page is displayed
   */
  async isTimePageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Time page is displayed`);
    return await this.isElementPresent(this.timePageTitle);
  }

  /**
   * Verify Punch In button is displayed
   */
  async isPunchInButtonDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Punch In button is displayed`);
    return await this.isElementPresent(this.punchInButton);
  }

  /**
   * Verify Punch Out button is displayed
   */
  async isPunchOutButtonDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying Punch Out button is displayed`);
    return await this.isElementPresent(this.punchOutButton);
  }

  /**
   * Get timesheet period
   */
  async getTimesheetPeriod(): Promise<string> {
    console.log(`📅 ${this.sessionName} Getting timesheet period`);
    return await this.getAttributeAfterWaitForElement(this.timesheetPeriod, 'value');
  }
}
