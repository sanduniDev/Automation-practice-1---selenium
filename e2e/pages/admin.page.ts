/**
 * Admin Page
 * Page object for OrangeHRM Admin module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class AdminPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly adminPageTitle: TestElement = {
    locator: By.xpath('//h6[text()="Admin"]'),
    label: 'Admin Page Title',
  };

  // User Management Section
  public readonly userManagementMenu: TestElement = {
    locator: By.xpath('//span[text()="User Management "]'),
    label: 'User Management Menu',
  };

  public readonly usersSubmenu: TestElement = {
    locator: By.xpath('//a[text()="Users"]'),
    label: 'Users Submenu',
  };

  // Job Section
  public readonly jobMenu: TestElement = {
    locator: By.xpath('//span[text()="Job "]'),
    label: 'Job Menu',
  };

  public readonly jobTitlesSubmenu: TestElement = {
    locator: By.xpath('//a[text()="Job Titles"]'),
    label: 'Job Titles Submenu',
  };

  // Organization Section
  public readonly organizationMenu: TestElement = {
    locator: By.xpath('//span[text()="Organization "]'),
    label: 'Organization Menu',
  };

  public readonly generalInformationSubmenu: TestElement = {
    locator: By.xpath('//a[text()="General Information"]'),
    label: 'General Information Submenu',
  };

  // Search Section
  public readonly usernameSearchInput: TestElement = {
    locator: By.xpath('//label[text()="Username"]/parent::div/following-sibling::div/input'),
    label: 'Username Search Input',
  };

  public readonly userRoleDropdown: TestElement = {
    locator: By.xpath('//label[text()="User Role"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'User Role Dropdown',
  };

  public readonly employeeNameInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div/input'),
    label: 'Employee Name Input',
  };

  public readonly statusDropdown: TestElement = {
    locator: By.xpath('//label[text()="Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Status Dropdown',
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
    label: 'Add Button',
  };

  // User Form Fields
  public readonly userRoleFormDropdown: TestElement = {
    locator: By.xpath('//label[text()="User Role"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'User Role Form Dropdown',
  };

  public readonly employeeNameFormInput: TestElement = {
    locator: By.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div/input'),
    label: 'Employee Name Form Input',
  };

  public readonly statusFormDropdown: TestElement = {
    locator: By.xpath('//label[text()="Status"]/parent::div/following-sibling::div//div[@class="oxd-select-text-input"]'),
    label: 'Status Form Dropdown',
  };

  public readonly usernameFormInput: TestElement = {
    locator: By.xpath('//label[text()="Username"]/parent::div/following-sibling::div/input'),
    label: 'Username Form Input',
  };

  public readonly passwordFormInput: TestElement = {
    locator: By.xpath('//label[text()="Password"]/parent::div/following-sibling::div/input'),
    label: 'Password Form Input',
  };

  public readonly confirmPasswordFormInput: TestElement = {
    locator: By.xpath('//label[text()="Confirm Password"]/parent::div/following-sibling::div/input'),
    label: 'Confirm Password Form Input',
  };

  public readonly saveButton: TestElement = {
    locator: By.xpath('//button[@type="submit"]'),
    label: 'Save Button',
  };

  public readonly cancelButton: TestElement = {
    locator: By.xpath('//button[text()=" Cancel "]'),
    label: 'Cancel Button',
  };

  // Results Table
  public readonly recordsFoundText: TestElement = {
    locator: By.xpath('//span[contains(text(), "Record")]'),
    label: 'Records Found Text',
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
   * Search for a user by username
   */
  async searchUserByUsername(username: string): Promise<void> {
    console.log(`🔍 ${this.sessionName} Searching for user: ${username}`);
    await this.clearAndTypeAfterWaitForElement(this.usernameSearchInput, username);
    await this.clickAfterWaitForElement(this.searchButton);
    console.log(`✅ ${this.sessionName} Search submitted`);
  }

  /**
   * Click Add button to create new user
   */
  async clickAddUser(): Promise<void> {
    console.log(`➕ ${this.sessionName} Clicking Add User button`);
    await this.clickAfterWaitForElement(this.addButton);
  }

  /**
   * Select user role from dropdown
   */
  async selectUserRole(role: string): Promise<void> {
    console.log(`👤 ${this.sessionName} Selecting user role: ${role}`);
    await this.clickAfterWaitForElement(this.userRoleFormDropdown);
    const roleOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${role}"]`),
      label: `${role} Option`,
    };
    await this.clickAfterWaitForElement(roleOption);
  }

  /**
   * Select status from dropdown
   */
  async selectStatus(status: string): Promise<void> {
    console.log(`📊 ${this.sessionName} Selecting status: ${status}`);
    await this.clickAfterWaitForElement(this.statusFormDropdown);
    const statusOption: TestElement = {
      locator: By.xpath(`//div[@role="option"]//span[text()="${status}"]`),
      label: `${status} Option`,
    };
    await this.clickAfterWaitForElement(statusOption);
  }

  /**
   * Fill in employee name and select from autocomplete
   */
  async selectEmployee(employeeName: string): Promise<void> {
    console.log(`👥 ${this.sessionName} Typing employee name: ${employeeName}`);
    await this.typeAfterWaitForElement(this.employeeNameFormInput, employeeName);
    await this.sleep(2000); // Wait for autocomplete

    const firstOption: TestElement = {
      locator: By.xpath('//div[@role="option"][1]'),
      label: 'First Employee Option',
    };
    await this.clickAfterWaitForElement(firstOption);
  }

  /**
   * Create a new user
   */
  async createUser(userRole: string, employeeName: string, status: string, username: string, password: string): Promise<void> {
    console.log(`👤 ${this.sessionName} Creating new user: ${username}`);

    await this.selectUserRole(userRole);
    await this.selectEmployee(employeeName);
    await this.selectStatus(status);
    await this.typeAfterWaitForElement(this.usernameFormInput, username);
    await this.typeAfterWaitForElement(this.passwordFormInput, password);
    await this.typeAfterWaitForElement(this.confirmPasswordFormInput, password);
    await this.clickAfterWaitForElement(this.saveButton);

    console.log(`✅ ${this.sessionName} User creation submitted`);
  }

  /**
   * Delete first user from search results
   */
  async deleteFirstUser(): Promise<void> {
    console.log(`🗑️ ${this.sessionName} Deleting first user`);
    await this.clickAfterWaitForElement(this.firstDeleteButton);
    await this.clickAfterWaitForElement(this.confirmDeleteButton);
    console.log(`✅ ${this.sessionName} User deletion confirmed`);
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
   * Verify admin page is displayed
   */
  async isAdminPageDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying admin page is displayed`);
    return await this.isElementPresent(this.adminPageTitle);
  }

  /**
   * Get records found count
   */
  async getRecordsCount(): Promise<string> {
    console.log(`📊 ${this.sessionName} Getting records count`);
    return await this.extractTextAfterWaitForElement(this.recordsFoundText);
  }

  /**
   * Verify user exists in search results
   */
  async isUserInResults(username: string): Promise<boolean> {
    const userElement: TestElement = {
      locator: By.xpath(`//div[contains(@class, "oxd-table-cell") and text()="${username}"]`),
      label: `User ${username} in results`,
    };
    return await this.isElementPresent(userElement);
  }
}
