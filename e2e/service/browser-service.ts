/**
 * Browser Service
 * Creates and configures browser instances with specific settings
 */

import { Builder, WebDriver, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import edge from 'selenium-webdriver/edge';
import { BrowserTypes, DeviceTypes, MobileDevices } from './definitions/browser-types';
import { BrowserMode } from './definitions/browser-mode';
import { registerWebDriver } from './webdriver-registry';
import { TestConfig } from '../config/test-config';

export class BrowserService {
  private browserType: BrowserTypes;
  private downloadDirectory?: string;
  private deviceType: DeviceTypes;
  private browserMode: BrowserMode;

  constructor(
    browserType: BrowserTypes = BrowserTypes.CHROME,
    downloadDirectory?: string,
    deviceType: DeviceTypes = DeviceTypes.DESKTOP,
    browserMode: BrowserMode = BrowserMode.MAXIMIZED
  ) {
    this.browserType = browserType;
    this.downloadDirectory = downloadDirectory || TestConfig.downloadDir;
    this.deviceType = deviceType;
    this.browserMode = browserMode;
  }

  /**
   * Build and return configured WebDriver instance
   */
  async build(): Promise<WebDriver> {
    console.log(`🚀 Starting ${this.browserType} browser in ${this.browserMode} mode...`);

    let driver: WebDriver;

    switch (this.browserType) {
      case BrowserTypes.CHROME:
        driver = await this.buildChrome();
        break;
      case BrowserTypes.FIREFOX:
        driver = await this.buildFirefox();
        break;
      case BrowserTypes.EDGE:
        driver = await this.buildEdge();
        break;
      default:
        throw new Error(`Unsupported browser type: ${this.browserType}`);
    }

    // Register the driver for tracking
    registerWebDriver(driver);

    // Set window size for desktop
    if (this.deviceType === DeviceTypes.DESKTOP && this.browserMode === BrowserMode.MAXIMIZED) {
      await driver.manage().window().maximize();
    }

    console.log(`✅ ${this.browserType} browser started successfully`);
    return driver;
  }

  /**
   * Build Chrome browser
   */
  private async buildChrome(): Promise<WebDriver> {
    const options = new chrome.Options();

    // Headless mode
    if (this.browserMode === BrowserMode.HEADLESS) {
      options.addArguments('--headless=new');
    }

    // Common Chrome arguments
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-popup-blocking');

    // Window size
    if (this.browserMode === BrowserMode.WINDOWED) {
      options.addArguments(`--window-size=${TestConfig.browserWidth},${TestConfig.browserHeight}`);
    }

    // Download preferences
    if (this.downloadDirectory) {
      options.setUserPreferences({
        'download.default_directory': this.downloadDirectory,
        'download.prompt_for_download': false,
        'download.directory_upgrade': true,
        'safebrowsing.enabled': true,
      });
    }

    // Mobile emulation
    if (this.deviceType === DeviceTypes.MOBILE) {
      options.setMobileEmulation({ deviceName: 'iPhone 13' });
    }

    return await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  /**
   * Build Firefox browser
   */
  private async buildFirefox(): Promise<WebDriver> {
    const options = new firefox.Options();

    // Headless mode
    if (this.browserMode === BrowserMode.HEADLESS) {
      options.addArguments('--headless');
    }

    // Window size
    if (this.browserMode === BrowserMode.WINDOWED) {
      options.addArguments(`--width=${TestConfig.browserWidth}`);
      options.addArguments(`--height=${TestConfig.browserHeight}`);
    }

    // Download preferences
    if (this.downloadDirectory) {
      options.setPreference('browser.download.folderList', 2);
      options.setPreference('browser.download.dir', this.downloadDirectory);
      options.setPreference('browser.download.useDownloadDir', true);
      options.setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/pdf,text/csv');
    }

    return await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  }

  /**
   * Build Edge browser
   */
  private async buildEdge(): Promise<WebDriver> {
    const options = new edge.Options();

    // Headless mode
    if (this.browserMode === BrowserMode.HEADLESS) {
      options.addArguments('--headless=new');
    }

    // Common Edge arguments
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');

    return await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();
  }
}
