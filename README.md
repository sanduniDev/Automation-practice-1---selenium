# OrangeHRM Selenium E2E Automation Tests

Comprehensive end-to-end automation test suite for the OrangeHRM Demo application using Selenium WebDriver, TypeScript, and Vitest.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Modules](#test-modules)
- [Page Object Model](#page-object-model)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [Best Practices](#best-practices)

## Overview

This project provides automated testing for the OrangeHRM demo application available at: https://opensource-demo.orangehrmlive.com

The test suite covers all major modules including:
- Login/Authentication
- Dashboard
- Admin (User Management)
- PIM (Personal Information Management)
- Leave Management
- Time Tracking
- Recruitment
- My Info
- Performance

## Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **TypeScript**: Type-safe code with better IDE support
- **Vitest Framework**: Modern, fast test runner with Jest-compatible API
- **Native ESM Support**: Modern JavaScript module system
- **Built-in Assertions**: No external assertion library needed
- **Multi-Browser Support**: Chrome, Firefox, Edge
- **Headless Mode**: Run tests without GUI
- **Watch Mode**: Auto-run tests on file changes
- **Vitest UI**: Optional browser-based test UI
- **Modular Architecture**: Reusable components and utilities
- **Test Data Generators**: Dynamic test data creation
- **Comprehensive Logging**: Detailed console output for debugging

## Project Structure

```
Automation-practice-1---selenium/
├── e2e/
│   ├── config/
│   │   └── test-config.ts          # Test configuration and constants
│   ├── pages/
│   │   ├── base.page.ts            # Base page with common methods
│   │   ├── login.page.ts           # Login page object
│   │   ├── dashboard.page.ts       # Dashboard page object
│   │   ├── admin.page.ts           # Admin module page object
│   │   ├── pim.page.ts             # PIM module page object
│   │   ├── leave.page.ts           # Leave module page object
│   │   ├── time.page.ts            # Time module page object
│   │   ├── recruitment.page.ts     # Recruitment module page object
│   │   ├── myinfo.page.ts          # My Info module page object
│   │   ├── performance.page.ts     # Performance module page object
│   │   └── index.ts                # Page objects export
│   ├── service/
│   │   ├── browser-service.ts      # Browser initialization and config
│   │   ├── webdriver-registry.ts   # WebDriver instance management
│   │   └── definitions/            # Type definitions
│   ├── helpers/
│   │   └── test-helpers.ts         # Test setup and teardown helpers
│   ├── utils/
│   │   ├── date-utils.ts           # Date manipulation utilities
│   │   └── test-data-generator.ts  # Test data generation
│   ├── types/
│   │   ├── test-element.ts         # Element type definitions
│   │   └── test-context.ts         # Test context types
│   └── tests/
│       ├── 01-login.test.ts        # Login module tests
│       ├── 02-dashboard.test.ts    # Dashboard module tests
│       ├── 03-admin.test.ts        # Admin module tests
│       ├── 04-pim.test.ts          # PIM module tests
│       ├── 05-leave.test.ts        # Leave module tests
│       ├── 06-time.test.ts         # Time module tests
│       ├── 07-recruitment.test.ts  # Recruitment module tests
│       └── 08-myinfo.test.ts       # My Info module tests
├── vitest.config.ts                # Vitest configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v18 or higher): [Download](https://nodejs.org/)
- **Yarn** (v1.22+ or v3+): [Install Yarn](https://yarnpkg.com/getting-started/install)
- **Chrome Browser** (latest version)
- **ChromeDriver** (automatically managed by selenium-webdriver)

Optional:
- **Firefox** and **geckodriver** for Firefox testing
- **Edge** and **edgedriver** for Edge testing

## Installation

1. Clone or navigate to the project directory:
```bash
cd Automation-practice-1---selenium
```

2. Install dependencies:
```bash
yarn install
```

This will install all required packages including:
- selenium-webdriver
- vitest
- vite
- typescript
- @vitest/ui

## Running Tests

### Run All Tests
```bash
yarn test
```

### Run Tests in Watch Mode (auto-rerun on changes)
```bash
yarn test:watch
```

### Run Tests with UI (browser-based interface)
```bash
yarn test:ui
```

### Run Specific Module Tests

**Login Tests:**
```bash
yarn test:login
```

**Dashboard Tests:**
```bash
yarn test:dashboard
```

**Admin Module Tests:**
```bash
yarn test:admin
```

**PIM Module Tests:**
```bash
yarn test:pim
```

**Leave Module Tests:**
```bash
yarn test:leave
```

**Time Module Tests:**
```bash
yarn test:time
```

**Recruitment Module Tests:**
```bash
yarn test:recruitment
```

**My Info Module Tests:**
```bash
yarn test:myinfo
```

### Run Tests in Headless Mode
```bash
yarn test:headless
```

### Run Tests with Coverage
```bash
yarn test:coverage
```

## Test Modules

### 1. Login Module (TC001-TC006)
- Load login page
- Login with valid credentials
- Login with invalid username
- Login with invalid password
- Login with empty credentials
- Logout functionality

### 2. Dashboard Module (TC007-TC015)
- Display dashboard title
- Verify user logged in
- Display dashboard widgets
- Navigate to all modules

### 3. Admin Module (TC016-TC022)
- Display admin page
- Search for users
- Display records count
- Reset search form
- Add user form
- User list management

### 4. PIM Module (TC023-TC030)
- Display PIM page
- Display employee records
- Search employees by ID
- Add new employee
- Navigate to contact details
- View employee details

### 5. Leave Module (TC031-TC038)
- Display leave page
- Navigate to apply leave
- Display leave balance
- Navigate to my leave
- Navigate to leave list
- Search leave by date range

### 6. Time Module (TC039-TC045)
- Display time page
- Navigate to timesheets
- Display timesheet period
- Punch in/out functionality
- Attendance records

### 7. Recruitment Module (TC046-TC053)
- Display recruitment page
- Display candidate records
- Navigate to candidates/vacancies
- Add candidate form
- Search candidates

### 8. My Info Module (TC054-TC062)
- Display personal details
- Get employee information
- Navigate to contact details
- Navigate to emergency contacts
- Navigate to qualifications

## Page Object Model

The project follows the Page Object Model (POM) design pattern:

- **BasePage**: Contains common methods used across all pages (click, type, wait, etc.)
- **Page Classes**: Each module has its own page class with specific elements and actions
- **Test Files**: Tests use page objects to interact with the application

Example:
```typescript
// Using page objects in tests
const { pages } = session;
await pages.login.visit(TestConfig.loginPageUrl);
await pages.login.login(username, password);
await pages.dashboard.navigateToAdmin();
```

## Configuration

### Test Configuration (e2e/config/test-config.ts)

Modify this file to change:
- Base URLs
- Default credentials
- Timeouts
- Browser dimensions
- Screenshot/download directories

```typescript
public static readonly baseUrl = 'https://opensource-demo.orangehrmlive.com';
public static readonly adminUsername = 'Admin';
public static readonly adminPassword = 'admin123';
public static readonly defaultTimeout = 30000;
```

### Browser Configuration

Change browser type in test files:
```typescript
browserType: BrowserTypes.CHROME  // CHROME, FIREFOX, or EDGE
```

Change browser mode:
```typescript
browserMode: BrowserMode.HEADLESS  // HEADLESS, MAXIMIZED, or WINDOWED
```

## Reporting

Vitest provides multiple reporting options:

### Console Reporter (Default)
Test results are displayed in the console with detailed logs:
```
✓ e2e/tests/01-login.test.ts (6)
  ✓ Login Module Tests (6)
    ✓ TC001: Should load login page successfully (2341ms)
    ✓ TC002: Should login with valid credentials (3456ms)
    ✓ TC003: Should show error with invalid username (2123ms)

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  10:30:45
   Duration  15.42s
```

### Vitest UI (Browser-Based)
Run tests with interactive UI:
```bash
yarn test:ui
```

This opens a browser with:
- Real-time test results
- Test file explorer
- Console output viewer
- Error stack traces
- Test re-run capability

### Coverage Report
Generate code coverage:
```bash
yarn test:coverage
```

Outputs:
- Text report in console
- HTML report in `coverage/` directory
- JSON report for CI/CD integration

## Best Practices

1. **Wait for Elements**: Always use explicit waits instead of hard sleeps
2. **Unique Locators**: Use reliable locators (IDs, names, unique xpaths)
3. **Page Objects**: Keep test logic separate from page interactions
4. **Test Independence**: Each test should be independent and able to run alone
5. **Clean Up**: Always close browsers after tests complete
6. **Descriptive Names**: Use clear, descriptive names for tests and methods
7. **Error Handling**: Tests should handle expected failures gracefully

## Troubleshooting

### Common Issues

**Tests failing to start:**
- Ensure ChromeDriver version matches your Chrome browser version
- Run `yarn install` to ensure all dependencies are installed

**Element not found errors:**
- Check if the application UI has changed
- Verify locators in page objects
- Increase timeout in test-config.ts

**Browser not closing:**
- Ensure `afterAll` hooks are executing
- Check for uncaught exceptions in tests

**TypeScript errors:**
- Run `yarn install` to ensure all packages are installed
- Check tsconfig.json configuration

## Contributing

To add new tests:

1. Create page object in `e2e/pages/` if needed
2. Add test file in `e2e/tests/`
3. Follow existing naming conventions (XX-modulename.test.ts)
4. Use consistent test case numbering (TCXXX)
5. Add yarn script in package.json for the new test module

## Support

For issues or questions:
- Check the OrangeHRM demo site: https://opensource-demo.orangehrmlive.com
- Review Selenium WebDriver docs: https://www.selenium.dev/documentation/
- Review Mocha docs: https://mochajs.org/

## License

ISC
