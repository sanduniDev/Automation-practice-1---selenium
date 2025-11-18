/**
 * Browser Mode Definition
 * Defines how the browser should run (visible or headless)
 */

export enum BrowserMode {
  HEADLESS = 'headless',   // Run without UI (faster, for CI/CD)
  MAXIMIZED = 'maximized', // Run with visible UI, maximized window
  WINDOWED = 'windowed',   // Run with visible UI, custom window size
}
