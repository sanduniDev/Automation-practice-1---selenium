/**
 * Test Context Types
 * Defines session and context structures for managing browser sessions
 */

import { WebDriver } from 'selenium-webdriver';
import { Pages } from '../pages';
import { BrowserTypes } from '../service/definitions/browser-types';

/**
 * Single browser session
 */
export interface Session {
  driver: WebDriver;                // The browser instance
  pages: Pages;                     // All page objects for this session
  sessionName: string;              // Unique identifier for this session
  browserType: BrowserTypes;        // Chrome, Firefox, etc.
  quit: () => Promise<void>;        // Cleanup function to close browser
}

/**
 * Test context containing one or more sessions
 */
export interface TestContext {
  sessions: Session[];                                  // All active sessions
  getSessionByName: (name: string) => Session;          // Find specific session
  quitAllSessions: () => Promise<void>;                 // Close all browsers
}

/**
 * Session configuration options
 */
export interface SessionOptions {
  sessionName: string;              // Unique name for this session
  browserType: BrowserTypes;        // Which browser to use
  downloadDir?: string;             // Optional download directory
  deviceType?: string;              // Optional device type (desktop, mobile)
  browserMode?: string;             // Optional browser mode (headless, maximized)
}

/**
 * Test context creation arguments
 */
export interface TestContextArgs {
  sessionsOptions: SessionOptions[];  // Array of session configurations
}
