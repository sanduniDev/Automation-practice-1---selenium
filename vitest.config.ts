import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Include test files
    include: ['e2e/tests/**/*.test.ts'],

    // Exclude files
    exclude: ['node_modules', 'dist'],

    // Global timeout for all tests (60 seconds)
    testTimeout: 60000,

    // Hooks timeout
    hookTimeout: 60000,

    // Run tests sequentially (important for E2E browser tests)
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },

    // Reporter configuration
    reporters: ['verbose'],

    // Setup files (run before tests)
    // setupFiles: ['./e2e/setup.ts'],

    // Globals (no need to import describe, it, expect)
    globals: true,

    // Bail on first failure (optional)
    // bail: 1,

    // Retry failed tests
    retry: 0,

    // Silent console logs during tests (set to false for debugging)
    silent: false,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'e2e/tests/',
        '**/*.config.ts',
      ],
    },
  },
});
