/**
 * Base Page
 * Contains common functionality that every page needs
 */

import { WebDriver, WebElement, until, By } from 'selenium-webdriver';
import { TestElement } from '../types/test-element';
import { TestConfig } from '../config/test-config';

export class BasePage {
  protected driver: WebDriver;
  protected sessionName: string;
  protected pages: any;

  constructor(driver: WebDriver, sessionName: string, pages: any) {
    this.driver = driver;
    this.sessionName = sessionName;
    this.pages = pages;
  }

  // ============= NAVIGATION =============

  /**
   * Navigate to a URL
   */
  async visit(url: string): Promise<void> {
    console.log(`🌐 ${this.sessionName} Navigating to: ${url}`);
    await this.driver.get(url);
  }

  /**
   * Refresh the current page
   */
  async refresh(): Promise<void> {
    console.log(`🔄 ${this.sessionName} Refreshing page`);
    await this.driver.navigate().refresh();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.driver.getTitle();
  }

  // ============= ELEMENT INTERACTIONS =============

  /**
   * Wait for element to be present and visible, then click
   */
  async clickAfterWaitForElement(element: TestElement): Promise<void> {
    console.log(`👆 ${this.sessionName} Clicking: ${element.label}`);
    const webElement = await this.waitForElement(element);
    await webElement.click();
  }

  /**
   * Wait for element to be present and visible, then type text
   */
  async typeAfterWaitForElement(element: TestElement, text: string): Promise<void> {
    console.log(`⌨️ ${this.sessionName} Typing into ${element.label}: "${text}"`);
    const webElement = await this.waitForElement(element);
    await webElement.sendKeys(text);
  }

  /**
   * Wait for element to be present and visible, clear it, then type text
   */
  async clearAndTypeAfterWaitForElement(element: TestElement, text: string): Promise<void> {
    console.log(`🧹 ${this.sessionName} Clearing and typing into ${element.label}: "${text}"`);
    const webElement = await this.waitForElement(element);
    await webElement.clear();
    await webElement.sendKeys(text);
  }

  /**
   * Wait for element and extract its text
   */
  async extractTextAfterWaitForElement(element: TestElement): Promise<string> {
    console.log(`📝 ${this.sessionName} Extracting text from: ${element.label}`);
    const webElement = await this.waitForElement(element);
    const text = await webElement.getText();
    console.log(`📄 ${this.sessionName} Text extracted: "${text}"`);
    return text;
  }

  /**
   * Wait for element and get attribute value
   */
  async getAttributeAfterWaitForElement(element: TestElement, attribute: string): Promise<string> {
    console.log(`🔍 ${this.sessionName} Getting attribute "${attribute}" from: ${element.label}`);
    const webElement = await this.waitForElement(element);
    const value = await webElement.getAttribute(attribute);
    return value || '';
  }

  // ============= ELEMENT QUERIES =============

  /**
   * Check if element is present on the page
   */
  async isElementPresent(element: TestElement): Promise<boolean> {
    try {
      await this.driver.wait(until.elementLocated(element.locator), TestConfig.shortTimeout);
      console.log(`✅ ${this.sessionName} Element present: ${element.label}`);
      return true;
    } catch (error) {
      console.log(`❌ ${this.sessionName} Element not present: ${element.label}`);
      return false;
    }
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(element: TestElement): Promise<boolean> {
    try {
      const webElement = await this.driver.findElement(element.locator);
      const isDisplayed = await webElement.isDisplayed();
      console.log(`👁️ ${this.sessionName} Element visible: ${element.label} = ${isDisplayed}`);
      return isDisplayed;
    } catch (error) {
      console.log(`👁️ ${this.sessionName} Element not visible: ${element.label}`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(element: TestElement): Promise<boolean> {
    try {
      const webElement = await this.driver.findElement(element.locator);
      const isEnabled = await webElement.isEnabled();
      console.log(`🔓 ${this.sessionName} Element enabled: ${element.label} = ${isEnabled}`);
      return isEnabled;
    } catch (error) {
      console.log(`🔒 ${this.sessionName} Element not enabled: ${element.label}`);
      return false;
    }
  }

  // ============= WAITING UTILITIES =============

  /**
   * Wait for element to be present, visible, and enabled
   */
  async waitForElement(element: TestElement): Promise<WebElement> {
    console.log(`⏳ ${this.sessionName} Waiting for element: ${element.label}`);

    // Wait for element to be located
    await this.driver.wait(until.elementLocated(element.locator), TestConfig.defaultTimeout);

    // Wait for element to be visible
    const webElement = await this.driver.findElement(element.locator);
    await this.driver.wait(until.elementIsVisible(webElement), TestConfig.defaultTimeout);

    console.log(`✅ ${this.sessionName} Element ready: ${element.label}`);
    return webElement;
  }

  /**
   * Wait for URL to contain specific text
   */
  async waitForUrlContains(partialUrl: string): Promise<boolean> {
    console.log(`⏳ ${this.sessionName} Waiting for URL to contain: ${partialUrl}`);
    try {
      await this.driver.wait(until.urlContains(partialUrl), TestConfig.defaultTimeout);
      console.log(`✅ ${this.sessionName} URL contains: ${partialUrl}`);
      return true;
    } catch (error) {
      console.log(`❌ ${this.sessionName} URL does not contain: ${partialUrl}`);
      return false;
    }
  }

  /**
   * Wait for specific amount of time (use sparingly)
   */
  async sleep(milliseconds: number): Promise<void> {
    console.log(`💤 ${this.sessionName} Sleeping for ${milliseconds}ms`);
    await this.driver.sleep(milliseconds);
  }

  // ============= SCREENSHOT =============

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName?: string): Promise<string> {
    const screenshot = await this.driver.takeScreenshot();
    const name = fileName || `screenshot-${Date.now()}.png`;
    console.log(`📸 ${this.sessionName} Screenshot taken: ${name}`);
    return screenshot;
  }

  // ============= BROWSER ACTIONS =============

  /**
   * Execute JavaScript in the browser
   */
  async executeScript(script: string, ...args: any[]): Promise<any> {
    return await this.driver.executeScript(script, ...args);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(element: TestElement): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling to: ${element.label}`);
    const webElement = await this.driver.findElement(element.locator);
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', webElement);
  }

  /**
   * Switch to iframe
   */
  async switchToIframe(element: TestElement): Promise<void> {
    console.log(`🖼️ ${this.sessionName} Switching to iframe: ${element.label}`);
    const iframe = await this.waitForElement(element);
    await this.driver.switchTo().frame(iframe);
  }

  /**
   * Switch to default content (exit iframe)
   */
  async switchToDefaultContent(): Promise<void> {
    console.log(`🖼️ ${this.sessionName} Switching to default content`);
    await this.driver.switchTo().defaultContent();
  }

  /**
   * Accept alert
   */
  async acceptAlert(): Promise<void> {
    console.log(`⚠️ ${this.sessionName} Accepting alert`);
    const alert = await this.driver.switchTo().alert();
    await alert.accept();
  }

  /**
   * Dismiss alert
   */
  async dismissAlert(): Promise<void> {
    console.log(`⚠️ ${this.sessionName} Dismissing alert`);
    const alert = await this.driver.switchTo().alert();
    await alert.dismiss();
  }

  /**
   * Get alert text
   */
  async getAlertText(): Promise<string> {
    console.log(`⚠️ ${this.sessionName} Getting alert text`);
    const alert = await this.driver.switchTo().alert();
    return await alert.getText();
  }
}
