/**
 * Test Helpers
 * Creates and initializes browser sessions for tests
 */

import { BrowserService } from '../service/browser-service';
import { Pages } from '../pages';
import { unregisterWebDriver } from '../service/webdriver-registry';
import { BrowserTypes } from '../service/definitions/browser-types';
import { BrowserMode } from '../service/definitions/browser-mode';
import { DeviceTypes } from '../service/definitions/browser-types';
import { TestContext, TestContextArgs, Session } from '../types/test-context';

export class TestHelpers {
  /**
   * Create test context with one or more browser sessions
   * @param args - Configuration for sessions to create
   * @returns TestContext with all initialized sessions
   */
  static async createTestContext(args: TestContextArgs): Promise<TestContext> {
    const { sessionsOptions } = args;

    console.log(`\n🎬 Creating ${sessionsOptions.length} browser session(s)...`);

    // Create all sessions in parallel
    const sessionPromises = sessionsOptions.map(async (sessionOption) => {
      return await this.createSession(sessionOption);
    });

    const sessions = await Promise.all(sessionPromises);

    // Create test context object
    const testContext: TestContext = {
      sessions,

      getSessionByName: (name: string): Session => {
        const session = sessions.find((s) => s.sessionName === name);
        if (!session) {
          throw new Error(`Session with name "${name}" not found`);
        }
        return session;
      },

      quitAllSessions: async (): Promise<void> => {
        console.log(`\n🧹 Closing ${sessions.length} browser session(s)...`);
        const quitPromises = sessions.map((session) => session.quit());
        await Promise.all(quitPromises);
        console.log('✅ All browser sessions closed\n');
      },
    };

    console.log('✅ All browser sessions created successfully\n');

    return testContext;
  }

  /**
   * Create a single browser session
   * @param sessionOption - Session configuration
   * @returns Initialized session
   */
  private static async createSession(sessionOption: any): Promise<Session> {
    const {
      sessionName,
      browserType = BrowserTypes.CHROME,
      downloadDir,
      deviceType = DeviceTypes.DESKTOP,
      browserMode = BrowserMode.MAXIMIZED,
    } = sessionOption;

    console.log(`📦 Creating session: ${sessionName} (${browserType})`);

    // Create browser instance
    const browserService = new BrowserService(browserType, downloadDir, deviceType, browserMode);
    const driver = await browserService.build();

    // Initialize page objects
    const pages = new Pages(driver, sessionName);

    // Create quit function
    const quit = async (): Promise<void> => {
      try {
        console.log(`🔒 Closing session: ${sessionName}`);
        await driver.quit();
        unregisterWebDriver(driver);
      } catch (error) {
        console.error(`❌ Error closing session ${sessionName}:`, error);
      }
    };

    return {
      driver,
      pages,
      sessionName,
      browserType,
      quit,
    };
  }
}
