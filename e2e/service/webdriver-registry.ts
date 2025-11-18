/**
 * WebDriver Registry
 * Tracks all active browser instances for cleanup and screenshot management
 */

import { WebDriver } from 'selenium-webdriver';

// Store all active WebDriver instances
const registeredDrivers: Set<WebDriver> = new Set();

/**
 * Register a new WebDriver instance
 * @param driver - WebDriver instance to register
 */
export function registerWebDriver(driver: WebDriver): void {
  registeredDrivers.add(driver);
  console.log(`✅ WebDriver registered. Total active drivers: ${registeredDrivers.size}`);
}

/**
 * Unregister a WebDriver instance (called after quit)
 * @param driver - WebDriver instance to unregister
 */
export function unregisterWebDriver(driver: WebDriver): void {
  registeredDrivers.delete(driver);
  console.log(`🗑️ WebDriver unregistered. Total active drivers: ${registeredDrivers.size}`);
}

/**
 * Get all registered WebDriver instances
 * @returns Array of all active WebDriver instances
 */
export function getAllRegisteredWebDrivers(): WebDriver[] {
  return Array.from(registeredDrivers);
}

/**
 * Quit and unregister all WebDriver instances
 * Useful for cleanup in case of errors
 */
export async function quitAllWebDrivers(): Promise<void> {
  console.log(`🧹 Cleaning up ${registeredDrivers.size} active driver(s)...`);

  const quitPromises = Array.from(registeredDrivers).map(async (driver) => {
    try {
      await driver.quit();
      unregisterWebDriver(driver);
    } catch (error) {
      console.error('❌ Error quitting driver:', error);
    }
  });

  await Promise.all(quitPromises);
  registeredDrivers.clear();
  console.log('✅ All drivers cleaned up');
}
