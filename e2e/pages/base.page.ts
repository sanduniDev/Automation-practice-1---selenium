/**
 * Base Page
 * Contains common functionality that every page needs
 */

import { WebDriver, WebElement, until, By } from 'selenium-webdriver';
import { TestElement } from '../types/test-element';
import { TestConfig } from '../config/test-config';
import { waitForElement, waitForElementAndExecute } from '../utils/selenium-utils';

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
   * @param element - TestElement to click
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async clickAfterWaitForElement(
    element: TestElement,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<void> {
    console.log(`👆 ${this.sessionName} Clicking: ${element.label}`);
    await waitForElementAndExecute(
      this.driver,
      element.locator,
      async (webElement) => {
        await webElement.click();
      },
      retries,
      timeout
    );
  }

  /**
   * Wait for element to be present and visible, then type text
   * @param element - TestElement to type into
   * @param text - Text to type
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async typeAfterWaitForElement(
    element: TestElement,
    text: string,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<void> {
    console.log(`⌨️ ${this.sessionName} Typing into ${element.label}: "${text}"`);
    await waitForElementAndExecute(
      this.driver,
      element.locator,
      async (webElement) => {
        await webElement.sendKeys(text);
      },
      retries,
      timeout
    );
  }

  /**
   * Wait for element to be present and visible, clear it, then type text
   * @param element - TestElement to clear and type into
   * @param text - Text to type
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async clearAndTypeAfterWaitForElement(
    element: TestElement,
    text: string,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<void> {
    console.log(`🧹 ${this.sessionName} Clearing and typing into ${element.label}: "${text}"`);
    await waitForElementAndExecute(
      this.driver,
      element.locator,
      async (webElement) => {
        await webElement.clear();
        await webElement.sendKeys(text);
      },
      retries,
      timeout
    );
  }

  /**
   * Wait for element and extract its text
   * @param element - TestElement to extract text from
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async extractTextAfterWaitForElement(
    element: TestElement,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<string> {
    console.log(`📝 ${this.sessionName} Extracting text from: ${element.label}`);
    const text = await waitForElementAndExecute(
      this.driver,
      element.locator,
      async (webElement) => {
        return await webElement.getText();
      },
      retries,
      timeout
    );
    console.log(`📄 ${this.sessionName} Text extracted: "${text}"`);
    return text;
  }

  /**
   * Wait for element and get attribute value
   * @param element - TestElement to get attribute from
   * @param attribute - Attribute name to get
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async getAttributeAfterWaitForElement(
    element: TestElement,
    attribute: string,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<string> {
    console.log(`🔍 ${this.sessionName} Getting attribute "${attribute}" from: ${element.label}`);
    const value = await waitForElementAndExecute(
      this.driver,
      element.locator,
      async (webElement) => {
        return await webElement.getAttribute(attribute);
      },
      retries,
      timeout
    );
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
   * Uses the core waitForElement utility from selenium-utils
   * @param element - TestElement to wait for
   * @param retries - Number of retry attempts (default: 2)
   * @param timeout - Timeout in milliseconds per retry (default: 1000)
   */
  async waitForElement(
    element: TestElement,
    retries: number = 2,
    timeout: number = 1000
  ): Promise<WebElement> {
    console.log(`⏳ ${this.sessionName} Waiting for element: ${element.label}`);
    const webElement = await waitForElement(this.driver, element.locator, retries, timeout);
    console.log(`✅ ${this.sessionName} Element ready: ${element.label}`);
    return webElement;
  }

  /**
   * Wait for URL to contain specific text
   * Specialized timeout: 30,000ms default (as per documentation)
   * @param partialUrl - Partial URL to wait for
   * @param timeout - Timeout in milliseconds (default: 30000)
   */
  async waitForUrlContains(partialUrl: string, timeout: number = 30000): Promise<boolean> {
    console.log(`⏳ ${this.sessionName} Waiting for URL to contain: ${partialUrl}`);
    try {
      await this.driver.wait(until.urlContains(partialUrl), timeout);
      console.log(`✅ ${this.sessionName} URL contains: ${partialUrl}`);
      return true;
    } catch (error) {
      console.log(`❌ ${this.sessionName} URL does not contain: ${partialUrl}`);
      return false;
    }
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

  // ============= FILE UPLOAD =============

  /**
   * Upload a file to an input element
   * Specialized timeout: 10,000ms for element location (as per documentation)
   * @param filePath - Path to the file to upload
   * @param inputElement - File input element
   * @param timeout - Timeout in milliseconds for element location (default: 10000)
   */
  async uploadFile(
    filePath: string,
    inputElement: TestElement,
    timeout: number = 10000
  ): Promise<void> {
    try {
      console.log(`🖼️ ${this.sessionName} Uploading file: ${filePath} to ${inputElement.label}`);

      // Check if running on Windows and ensure path uses forward slashes for Selenium
      const normalizedPath = filePath.replace(/\\/g, '/');

      // Wait for the element to be located in the DOM
      const fileInput = await this.driver.wait(
        async () => {
          try {
            return await this.driver.findElement(inputElement.locator);
          } catch (e) {
            return null;
          }
        },
        timeout,
        `Timeout waiting for file input element: ${inputElement.label}`
      );

      if (!fileInput) {
        throw new Error(`File input element not found: ${inputElement.label}`);
      }

      // Wait for the element to be enabled
      await this.driver.wait(
        async () => {
          return await fileInput.isEnabled();
        },
        5000,
        `File input element is not enabled: ${inputElement.label}`
      );

      // Upload the file path
      console.log(`⏳ ${this.sessionName} Uploading file from: ${normalizedPath}`);
      await fileInput.sendKeys(normalizedPath);

      console.log(`✅ ${this.sessionName} File uploaded successfully`);
    } catch (error) {
      console.error(`❌ ${this.sessionName} Error uploading file:`, error);
      throw error;
    }
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

  // ============= TOAST MESSAGES =============

  /**
   * Generate toast element locator
   * Supports both old toasts (with data-type) and new toasts (with data-sonner-toast)
   * @param dataType - 'success' | 'error' | 'loading' | undefined
   * @param message - Toast message text to match
   */
  public toast(
    dataType: 'success' | 'error' | 'loading' | undefined,
    message: string
  ): TestElement {
    let xpath: string;
    if (dataType) {
      // Old toasts with data-type attribute
      xpath = `//li[@data-type='${dataType}' and @data-visible='true' and contains(., '${message}')]`;
    } else {
      // New toasts without data-type but with data-sonner-toast attribute (a good unique marker)
      xpath = `//li[@data-visible='true' and @data-sonner-toast and contains(., '${message}')]`;
    }
    return {
      locator: By.xpath(xpath),
      label: `toast ${dataType ?? 'default'}: ${message}`,
    };
  }

  /**
   * Wait for toast message to appear
   * @param dataType - 'success' | 'error' | 'loading' | undefined
   * @param message - Expected toast message text
   * @param timeout - Timeout in milliseconds (default: 5000)
   */
  async waitForToast(
    dataType: 'success' | 'error' | 'loading' | undefined,
    message: string,
    timeout: number = 5000
  ): Promise<boolean> {
    console.log(`⏳ ${this.sessionName} Waiting for toast: ${dataType ?? 'default'} - "${message}"`);
    try {
      const toastElement = this.toast(dataType, message);
      await this.waitForElement(toastElement, 5, timeout / 5);
      console.log(`✅ ${this.sessionName} Toast appeared: ${dataType ?? 'default'}`);
      return true;
    } catch (error) {
      console.log(`❌ ${this.sessionName} Toast did not appear: ${dataType ?? 'default'}`);
      return false;
    }
  }

  /**
   * Get toast message text
   * @param dataType - 'success' | 'error' | 'loading' | undefined
   */
  async getToastText(
    dataType: 'success' | 'error' | 'loading' | undefined
  ): Promise<string> {
    console.log(`📝 ${this.sessionName} Getting toast text for type: ${dataType ?? 'default'}`);
    let xpath: string;
    if (dataType) {
      xpath = `//li[@data-type='${dataType}' and @data-visible='true']`;
    } else {
      xpath = `//li[@data-visible='true' and @data-sonner-toast]`;
    }
    const toastElement: TestElement = {
      locator: By.xpath(xpath),
      label: `Toast ${dataType ?? 'default'} text`,
    };
    return await this.extractTextAfterWaitForElement(toastElement, 3, 1000);
  }

  // ============= SCROLLING UTILITIES =============

  /**
   * Scroll to top of page
   */
  async scrollToTop(): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling to top of page`);
    await this.executeScript('window.scrollTo(0, 0);');
  }

  /**
   * Scroll to bottom of page
   */
  async scrollToBottom(): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling to bottom of page`);
    await this.executeScript('window.scrollTo(0, document.body.scrollHeight);');
  }

  /**
   * Scroll by specific pixels
   * @param x - Horizontal scroll amount
   * @param y - Vertical scroll amount
   */
  async scrollBy(x: number, y: number): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling by: x=${x}, y=${y}`);
    await this.executeScript(`window.scrollBy(${x}, ${y});`);
  }

  /**
   * Scroll element into view with alignment
   * @param element - TestElement to scroll to
   * @param alignToTop - If true, align to top; if false, align to bottom (default: true)
   */
  async scrollElementIntoView(element: TestElement, alignToTop: boolean = true): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling element into view: ${element.label}`);
    const webElement = await this.driver.findElement(element.locator);
    await this.executeScript(`arguments[0].scrollIntoView(${alignToTop});`, webElement);
  }

  /**
   * Scroll to element smoothly with behavior
   * @param element - TestElement to scroll to
   */
  async scrollToElementSmooth(element: TestElement): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling smoothly to: ${element.label}`);
    const webElement = await this.driver.findElement(element.locator);
    await this.executeScript(
      'arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });',
      webElement
    );
  }

  /**
   * Scroll within a specific scrollable container
   * @param containerElement - Container element with scroll
   * @param scrollTop - Vertical scroll position
   */
  async scrollWithinContainer(containerElement: TestElement, scrollTop: number): Promise<void> {
    console.log(`📜 ${this.sessionName} Scrolling within container: ${containerElement.label}`);
    const webElement = await this.driver.findElement(containerElement.locator);
    await this.executeScript(`arguments[0].scrollTop = ${scrollTop};`, webElement);
  }

  /**
   * Check if element is in viewport
   * @param element - TestElement to check
   */
  async isElementInViewport(element: TestElement): Promise<boolean> {
    console.log(`👁️ ${this.sessionName} Checking if element is in viewport: ${element.label}`);
    const webElement = await this.driver.findElement(element.locator);
    const result = await this.executeScript(
      `
      var elem = arguments[0];
      var rect = elem.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      `,
      webElement
    );
    return result as boolean;
  }
}
