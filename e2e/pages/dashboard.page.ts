/**
 * Dashboard Page
 * Page object for OrangeHRM dashboard after login
 */

import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';
import { TestElement } from '../types/test-element';

export class DashboardPage extends BasePage {
  // ============= PAGE ELEMENTS =============

  public readonly dashboardTitle: TestElement = {
    locator: By.xpath('//h6[text()="Dashboard"]'),
    label: 'Dashboard Title',
  };

  public readonly userDropdown: TestElement = {
    locator: By.css('.oxd-userdropdown'),
    label: 'User Dropdown',
  };

  public readonly logoutLink: TestElement = {
    locator: By.xpath('//a[text()="Logout"]'),
    label: 'Logout Link',
  };

  public readonly timeAtWorkWidget: TestElement = {
    locator: By.xpath('//p[text()="Time at Work"]'),
    label: 'Time at Work Widget',
  };

  public readonly myActionsWidget: TestElement = {
    locator: By.xpath('//p[text()="My Actions"]'),
    label: 'My Actions Widget',
  };

  public readonly quickLaunchWidget: TestElement = {
    locator: By.xpath('//p[text()="Quick Launch"]'),
    label: 'Quick Launch Widget',
  };

  public readonly employeeDistributionWidget: TestElement = {
    locator: By.xpath('//p[text()="Employee Distribution by Sub Unit"]'),
    label: 'Employee Distribution Widget',
  };

  public readonly employeeOnLeaveWidget: TestElement = {
    locator: By.xpath('//p[text()="Employees on Leave Today"]'),
    label: 'Employees on Leave Widget',
  };

  // Main Menu Items
  public readonly adminMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Admin"]'),
    label: 'Admin Menu Item',
  };

  public readonly pimMenuItem: TestElement = {
    locator: By.xpath('//span[text()="PIM"]'),
    label: 'PIM Menu Item',
  };

  public readonly leaveMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Leave"]'),
    label: 'Leave Menu Item',
  };

  public readonly timeMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Time"]'),
    label: 'Time Menu Item',
  };

  public readonly recruitmentMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Recruitment"]'),
    label: 'Recruitment Menu Item',
  };

  public readonly myInfoMenuItem: TestElement = {
    locator: By.xpath('//span[text()="My Info"]'),
    label: 'My Info Menu Item',
  };

  public readonly performanceMenuItem: TestElement = {
    locator: By.xpath('//span[text()="Performance"]'),
    label: 'Performance Menu Item',
  };

  // ============= PAGE ACTIONS =============

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    console.log(`🚪 ${this.sessionName} Logging out`);
    await this.clickAfterWaitForElement(this.userDropdown);
    await this.clickAfterWaitForElement(this.logoutLink);
    console.log(`✅ ${this.sessionName} Logged out successfully`);
  }

  /**
   * Navigate to Admin module
   */
  async navigateToAdmin(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Admin`);
    await this.clickAfterWaitForElement(this.adminMenuItem);
  }

  /**
   * Navigate to PIM module
   */
  async navigateToPIM(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to PIM`);
    await this.clickAfterWaitForElement(this.pimMenuItem);
  }

  /**
   * Navigate to Leave module
   */
  async navigateToLeave(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Leave`);
    await this.clickAfterWaitForElement(this.leaveMenuItem);
  }

  /**
   * Navigate to Time module
   */
  async navigateToTime(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Time`);
    await this.clickAfterWaitForElement(this.timeMenuItem);
  }

  /**
   * Navigate to Recruitment module
   */
  async navigateToRecruitment(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Recruitment`);
    await this.clickAfterWaitForElement(this.recruitmentMenuItem);
  }

  /**
   * Navigate to My Info module
   */
  async navigateToMyInfo(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to My Info`);
    await this.clickAfterWaitForElement(this.myInfoMenuItem);
  }

  /**
   * Navigate to Performance module
   */
  async navigateToPerformance(): Promise<void> {
    console.log(`🔗 ${this.sessionName} Navigating to Performance`);
    await this.clickAfterWaitForElement(this.performanceMenuItem);
  }

  // ============= PAGE VERIFICATIONS =============

  /**
   * Verify dashboard page is displayed
   */
  async isDashboardDisplayed(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying dashboard is displayed`);
    return await this.isElementPresent(this.dashboardTitle);
  }

  /**
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    console.log(`✅ ${this.sessionName} Verifying user is logged in`);
    return await this.isElementPresent(this.userDropdown);
  }

  /**
   * Get dashboard widgets count
   */
  async getWidgetsCount(): Promise<number> {
    const widgets = await this.driver.findElements(By.css('.orangehrm-dashboard-widget'));
    return widgets.length;
  }
}
