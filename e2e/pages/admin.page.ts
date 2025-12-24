/**
 * Admin Page
 * Page object for OrangeHRM Admin module
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';
import { CommonUtils } from '../utils/common-utils';
import { waitForElement } from '../utils/selenium-utils';

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
    locator: By.xpath('//label[text()="Employee Name"]/parent::div/following-sibling::div//input'),
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
    locator: By.xpath('//span[contains(text(), "Record") or contains(text(), "Found") or contains(text(), "record")]'),
    label: 'Records Found Text',
  };

  public readonly firstDeleteButton: TestElement = {
    locator: By.xpath('(//div[@role="table"]//div[@role="row"][2]//i[contains(@class, "bi-trash")])[1]'),
    label: 'First Delete Button',
  };

  public readonly firstEditButton: TestElement = {
    locator: By.xpath('(//button[contains(@class, "oxd-icon-button")]//i[contains(@class, "bi-pencil-fill")])[1]'),
    label: 'First Edit Button',
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

    // Wait for the employee name field to be ready
    await CommonUtils.delay(500, 'Wait for employee field to be ready');

    await this.typeAfterWaitForElement(this.employeeNameFormInput, employeeName, 3, 2000);
    await CommonUtils.delay(3000, 'Wait for autocomplete to appear');

    const firstOption: TestElement = {
      locator: By.xpath('//div[@role="option"][1]'),
      label: 'First Employee Option',
    };
    await this.clickAfterWaitForElement(firstOption, 3, 2000);
  }

  /**
   * Create a new user
   */
  async createUser(userRole: string, employeeName: string, status: string, username: string, password: string): Promise<void> {
    console.log(`👤 ${this.sessionName} Creating new user: ${username}`);

    await this.selectUserRole(userRole);
    await CommonUtils.delay(2000, 'Wait after role selection for form to update');

    await this.selectEmployee(employeeName);
    await CommonUtils.delay(1000, 'Wait after employee selection');

    await this.selectStatus(status);
    await CommonUtils.delay(1000, 'Wait after status selection');

    await this.typeAfterWaitForElement(this.usernameFormInput, username);
    await this.typeAfterWaitForElement(this.passwordFormInput, password);
    await this.typeAfterWaitForElement(this.confirmPasswordFormInput, password);
    await this.clickAfterWaitForElement(this.saveButton);

    console.log(`✅ ${this.sessionName} User creation submitted`);
  }

  /**
   * Click edit button for the first user in search results
   */
  async clickEditFirstUser(): Promise<void> {
    console.log(`✏️ ${this.sessionName} Clicking edit for first user`);
    await this.clickAfterWaitForElement(this.firstEditButton);
    await CommonUtils.delay(1000, 'Wait for edit form to load');
  }

  /**
   * Update user information
   */
  async updateUser(userRole?: string, employeeName?: string, status?: string, username?: string, password?: string): Promise<void> {
    console.log(`📝 ${this.sessionName} Updating user information`);

    if (userRole) {
      await this.selectUserRole(userRole);
    }

    if (employeeName) {
      await this.clearAndTypeAfterWaitForElement(this.employeeNameFormInput, employeeName);
      await CommonUtils.delay(2000, 'Wait for autocomplete');
      const firstOption: TestElement = {
        locator: By.xpath('//div[@role="option"][1]'),
        label: 'First Employee Option',
      };
      await this.clickAfterWaitForElement(firstOption);
    }

    if (status) {
      await this.selectStatus(status);
    }

    if (username) {
      await this.clearAndTypeAfterWaitForElement(this.usernameFormInput, username);
    }

    if (password) {
      await this.typeAfterWaitForElement(this.passwordFormInput, password);
      await this.typeAfterWaitForElement(this.confirmPasswordFormInput, password);
    }

    await this.clickAfterWaitForElement(this.saveButton);
    console.log(`✅ ${this.sessionName} User update submitted`);
  }

  /**
   * Delete first user from search results
   */
  async deleteFirstUser(): Promise<void> {
    console.log(`🗑️ ${this.sessionName} Deleting first user`);

    // Scroll to ensure the table is visible
    try {
      const tableElement: TestElement = {
        locator: By.xpath('//div[@role="table"]'),
        label: 'Admin Results Table',
      };
      await this.scrollElementIntoView(tableElement);
      await CommonUtils.delay(1000, 'Wait after scroll to table');
    } catch (error) {
      console.log(`⚠️ ${this.sessionName} Could not scroll to table`);
    }

    await this.clickAfterWaitForElement(this.firstDeleteButton, 3, 2000);
    await CommonUtils.delay(500, 'Wait for delete confirmation dialog');
    await this.clickAfterWaitForElement(this.confirmDeleteButton, 3, 2000);
    console.log(`✅ ${this.sessionName} User deletion confirmed`);
  }

  /**
   * Delete user by username
   */
  async deleteUserByUsername(username: string): Promise<void> {
    console.log(`🗑️ ${this.sessionName} Deleting user: ${username}`);
    await this.searchUserByUsername(username);
    await CommonUtils.delay(2000, 'Wait for search results');
    await this.deleteFirstUser();
    await CommonUtils.delay(2000, 'Wait for deletion to complete');
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
    // Wait for the page to load
    await CommonUtils.delay(1500, 'Wait for page to load');

    // Scroll to ensure records are visible
    try {
      const tableElement: TestElement = {
        locator: By.xpath('//div[@role="table"]'),
        label: 'Admin Table',
      };
      await this.scrollElementIntoView(tableElement);
      await CommonUtils.delay(500, 'Wait after scroll');
    } catch (error) {
      console.log(`⚠️ ${this.sessionName} Could not scroll to table, continuing anyway`);
    }

    // Use longer timeout and more retries for records count
    return await this.extractTextAfterWaitForElement(this.recordsFoundText, 3, 2500);
  }

  /**
   * Verify user exists in search results
   */
  async isUserInResults(username: string): Promise<boolean> {
    try {
      // Wait for the page to load
      await CommonUtils.delay(1000, 'Wait for search results to render');

      // Scroll to ensure table is visible
      try {
        const tableElement: TestElement = {
          locator: By.xpath('//div[@role="table"]'),
          label: 'Admin Results Table',
        };
        await this.scrollElementIntoView(tableElement);
        await CommonUtils.delay(500, 'Wait after scroll');
      } catch (scrollError) {
        console.log(`⚠️ ${this.sessionName} Could not scroll to table, continuing anyway`);
      }

      const userLocator = By.xpath(`//div[@role="row"]//div[contains(@class, "oxd-table-cell") and contains(text(), "${username}")]`);

      // Use waitForElement with increased timeout and retries
      await waitForElement(this.driver, userLocator, 3, 2500);
      console.log(`✅ ${this.sessionName} User found in results: ${username}`);
      return true;
    } catch (error) {
      console.log(`❌ ${this.sessionName} User not found in results: ${username}`);
      return false;
    }
  }

  /**
   * Check if results table is present
   */
  async isResultsTablePresent(): Promise<boolean> {
    try {
      const tableElement: TestElement = {
        locator: By.xpath('//div[@role="table"]'),
        label: 'Results Table',
      };
      return await this.isElementPresent(tableElement);
    } catch (error) {
      console.log(`❌ ${this.sessionName} Results table not found`);
      return false;
    }
  }
}
