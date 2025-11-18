/**
 * Test Configuration
 * Central place for all test data, URLs, and credentials
 */

export abstract class TestConfig {
  // Base URL for OrangeHRM Demo Site
  public static readonly baseUrl = 'https://opensource-demo.orangehrmlive.com';

  // Login Page URL
  public static readonly loginPageUrl = `${this.baseUrl}/web/index.php/auth/login`;

  // Dashboard URL (after login)
  public static readonly dashboardUrl = `${this.baseUrl}/web/index.php/dashboard/index`;

  // Test User Credentials (OrangeHRM Demo credentials)
  public static readonly adminUsername = 'Admin';
  public static readonly adminPassword = 'admin123';

  // Timeouts (in milliseconds)
  public static readonly defaultTimeout = 30000; // 30 seconds
  public static readonly shortTimeout = 10000;   // 10 seconds
  public static readonly longTimeout = 60000;    // 60 seconds

  // Browser Configuration
  public static readonly browserWidth = 1920;
  public static readonly browserHeight = 1080;

  // Screenshot directory
  public static readonly screenshotDir = './test-results/screenshots';

  // Download directory
  public static readonly downloadDir = './test-results/downloads';
}
