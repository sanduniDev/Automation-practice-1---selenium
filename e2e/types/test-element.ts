/**
 * Test Element Type
 * Wrapper for Selenium locators with labels for better logging
 */

import { By } from 'selenium-webdriver';

export interface TestElement {
  locator: By;      // Selenium locator (By.id, By.xpath, etc.)
  label: string;    // Human-readable name for logging and debugging
}
