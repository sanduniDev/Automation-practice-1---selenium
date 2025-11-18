/**
 * PIM Page
 * Page object for OrangeHRM PIM (Personal Information Management) module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class PimPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly pimPageTitle: TestElement = {
    locator: By.xpath('//h6[text()="PIM"]'),
    label: 'PIM Page Title',
  };

  // Configuration Menu
  public readonly configurationMenu: TestElement = {
    locator: By.xpath('//span[text()="Configuration "]'),
    label: 'Configuration Menu',
  };

  // Employee List Section
  public readonly employeeNameSearchInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div/input'),
    label: 'Employee Name Search Input',
  };

  public readonly employeeIdSearchInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Id"]/parent::div/following-sibling::div/input'),
    label: 'Employee ID Search Input',
  };

  public readonly employmentStatusDropdown: TestElement = {
    locator: By.xpath('//label[text()="Employment Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Employment Status Dropdown',
  };

  public readonly searchButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Search Button',
  };

  public readonly resetButton: TestElement = {
    locator: By.xpath('//button[text()=" Reset "]'),
    label: 'Reset Button',
  };

  public readonly addButton: TestElement = {
    locator: By.xpath('//button[text()=" Add "]'),
    label: 'Add Employee Button',
  };

  // Add Employee Form
  public readonly firstNameInput: TestElement = {
    locator: By.name('firstName'),
    label: 'First Name Input',
  };

  public readonly middleNameInput: TestElement = {
    locator: By.name('middleName'),
    label: 'Middle Name Input',
  };

  public readonly lastNameInput: TestElement = {
    locator: By.name('lastName'),
    label: 'Last Name Input',
  };

  public readonly employeeIdInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Id"]/parent::div/following-sibling::div/input'),
    label: 'Employee ID Input',
  };

  public readonly createLoginDetailsToggle: TestElement = {
    locator: By.xpath('//span[contains(@class, "oxd-switch-input")]'),
    label: 'Create Login Details Toggle',
  };

  public readonly usernameInput: TestElement = {
    locator: By.xpath('//label[text()="Username"]/parent::div/following-sibling::div/input'),
    label: 'Username Input',
  };

  public readonly passwordInput: TestElement = {
    locator: By.xpath('//label[text()="Password"]/parent::div/following-sibling::div/input'),
    label: 'Password Input',
  };

  public readonly confirmPasswordInput: TestElement = {
    locator: By.xpath('//label[text()="Confirm Password"]/parent::div/following-sibling::div/input'),
    label: 'Confirm Password Input',
  };

  public readonly saveButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Save Button',
  };

  public readonly cancelButton: TestElement = {
    locator: By.xpath('//button[text()=" Cancel "]'),
    label: 'Cancel Button',
  };

  // Employee Details Tabs
  public readonly personalDetailsTab: TestElement = {
    locator: By.xpath('//a[text()="Personal Details"]'),
    label: 'Personal Details Tab',
  };

  public readonly contactDetailsTab: TestElement = {
    locator: By.xpath('//a[text()="Contact Details"]'),
    label: 'Contact Details Tab',
  };

  public readonly emergencyContactsTab: TestElement = {
    locator: By.xpath('//a[text()="Emergency Contacts"]'),
    label: 'Emergency Contacts Tab',
  };

  public readonly dependentsTab: TestElement = {
    locator: By.xpath('//a[text()="Dependents"]'),
    label: 'Dependents Tab',
  };

  public readonly immigrationTab: TestElement = {
    locator: By.xpath('//a[text()="Immigration"]'),
    label: 'Immigration Tab',
  };

  public readonly jobTab: TestElement = {
    locator: By.xpath('//a[text()="Job"]'),
    label: 'Job Tab',
  };

  public readonly salaryTab: TestElement = {
    locator: By.xpath('//a[text()="Salary"]'),
    label: 'Salary Tab',
  };

  // Results Table
  public readonly recordsFoundText: TestElement = {
    locator: By.xpath('//span[contains(text(), "Record")]'),
    label: 'Records Found Text',
  };

  public readonly firstEmployeeLink: TestElement = {
    locator: By.xpath('(//div[@role="table"]//div[@role="row"])[2]//div[@role="cell"][3]//a'),
    label: 'First Employee Link',
  };

  public readonly firstDeleteButton: TestElement = {
    locator: By.xpath('(//button[contains(@class, "oxd-icon-button")]//i[contains(@class, "trash")])[1]'),
    label: 'First Delete Button',
  };

  public readonly confirmDeleteButton: TestElement = {
    locator: By.xpath('//button[text()=" Yes, Delete "]'),
    label: 'Confirm Delete Button',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Search for an employee by name
   */
  async searchEmployeeByName(employeeName: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for employee: ${employeeName}`);
    await this.typeAfterWaitForElement(this.employeeNameSearchInput, employeeName);
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
   * Search for an employee by ID
   */
  async searchEmployeeById(employeeId: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for employee ID: ${employeeId}`);
    await this.clearAndTypeAfterWaitForElement(this.employeeIdSearchInput, employeeId);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Click Add button to create new employee
   */
  async clickAddEmployee(): Promise<void> {
    console.log(`➕ ${this.sessionName} Clicking Add Employee button`);
    await this.clickAfterWaitForElement(this.addButton);
  }

  /**
   * Add a new employee with basic details
   */
  async addEmployee(firstName: string, middleName: string, lastName: string, employeeId?: string): Promise<void> {
    console.log(`👤 ${this.sessionName} Adding new employee: ${firstName} ${lastName}`);

    await this.clearAndTypeAfterWaitForElement(this.firstNameInput, firstName);
    await this.clearAndTypeAfterWaitForElement(this.middleNameInput, middleName);
    await this.clearAndTypeAfterWaitForElement(this.lastNameInput, lastName);

    if (employeeId) {
      await this.clearAndTypeAfterWaitForElement(this.employeeIdInput, employeeId);
    }

    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} Employee creation submitted`);
  }

  /**
   * Add employee with login credentials
   */
  async addEmployeeWithLogin(
    firstName: string,
    middleName: string,
    lastName: string,
    username: string,
    password: string,
    employeeId?: string
  ): Promise<void> {
    console.log(`👤 ${this.sessionName} Adding new employee with login: ${firstName} ${lastName}`);

    await this.clearAndTypeAfterWaitForElement(this.firstNameInput, firstName);
    await this.clearAndTypeAfterWaitForElement(this.middleNameInput, middleName);
    await this.clearAndTypeAfterWaitForElement(this.lastNameInput, lastName);

    if (employeeId) {
      await this.clearAndTypeAfterWaitForElement(this.employeeIdInput, employeeId);
    }

    // Enable create login details
    await this.clickAfterWaitForElement(this.createLoginDetailsToggle);

    // Fill login credentials
    await this.clearAndTypeAfterWaitForElement(this.usernameInput, username);
    await this.clearAndTypeAfterWaitForElement(this.passwordInput, password);
    await this.clearAndTypeAfterWaitForElement(this.confirmPasswordInput, password);

    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} Employee with login created`);
  }

  /**
   * Navigate to employee details by clicking first result
   */
  async viewFirstEmployee(): Promise<void> {
    console.log(`👁️ ${this.sessionName} Viewing first employee details`);
    await this.clickAfterWaitForElement(this.firstEmployeeLink);
  }

  /**
   * Delete first employee from search results
   */
  async deleteFirstEmployee(): Promise<void> {
    console.log(`🗑️ ${this.sessionName} Deleting first employee`);
    await this.clickAfterWaitForElement(this.firstDeleteButton);
    await this.clickAfterWaitForElement(this.confirmDeleteButton);
    console.log(`✅ ${this.sessionName} Employee deletion confirmed`);
  }

  /**
   * Navigate to Contact Details tab
   */
  async navigateToContactDetails(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Contact Details`);
    await this.clickAfterWaitForElement(this.contactDetailsTab);
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
   * Verify PIM page is displayed
   */
  async isPimPageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying PIM page is displayed`);
    return await this.isElementPresent(this.pimPageTitle);
  }

  /**
   * Get records found count
   */
  async getRecordsCount(): Promise<string> {
    console.log(`📊 ${this.sessionName} Getting records count`);
    return await this.extractTextAfterWaitForElement(this.recordsFoundText);
  }

  /**
   * Verify employee exists in search results
   */
  async isEmployeeInResults(employeeName: string): Promise<boolean> {
    const employeeElement: TestElement = {
      locator: By.xpath(`//div[contains(@class, "oxd-table-cell") and contains(text(), "${employeeName}")]`),
      label: `Employee ${employeeName} in results`,
    };
    return await this.isElementPresent(employeeElement);
  }
}
