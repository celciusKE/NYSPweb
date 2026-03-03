# NYSP Web Test Automation

This project contains automated end-to-end tests for the NYSP (Nyansapo) web application using Playwright.

## Project Structure

```
NYSPweb/
├── .github/
│   └── workflows/
│       └── playwright.yml    # CI/CD configuration for running tests
├── fixtures/
│   ├── testdata.json          # Test data for all test scenarios
│   └── school_template (3).xlsx  # Excel template for school upload
├── pages/
│   ├── userlogin.js           # Login and Signup page objects
│   ├── organization.js        # Organization page objects
│   ├── project.js             # Project page objects
│   └── instructors.js         # Instructors page objects
├── tests/
│   ├── login.js                # Login and signup tests
│   ├── organization.js         # Organization creation tests
│   ├── project.js              # Project creation tests
│   ├── assessments.js          # Assessment tests
│   └── ...
├── utils/
│   └── CommonActions.js        # Common actions used across tests
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
└── send-report.js             # Script to send test reports
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/login.js
```

### Run tests with specific tag
```bash
npx playwright test --grep "login"
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests and generate report
```bash
npx playwright show-report
```

## Test Data

All test data is stored in `fixtures/testdata.json`. The file contains:

- **users**: Login credentials (valid and invalid)
- **signup**: Signup test data
- **organization**: Organization creation test data
- **projects**: Project creation test data
- **schools**: School upload test data
- **assessments**: Assessment test data

### Adding Test Data

To add new test data, edit `fixtures/testdata.json`:

```json
{
  "users": {
    "newUserType": {
      "phoneNumber": "123456789",
      "pin": "123456"
    }
  }
}
```

## Page Objects

The project uses the Page Object Model pattern:

- **LoginPage**: Handles login functionality
- **SignupPage**: Handles signup functionality
- **CreateOrganization**: Handles organization creation
- **CreateProject**: Handles project creation

## Edge Cases Covered

### Login Tests
- Valid user login
- Invalid phone number
- Invalid PIN
- Missing phone number
- Missing PIN
- Short phone number
- Short PIN (less than 6 digits)
- Alphanumeric PIN
- Long phone number

### Organization Tests
- Create new organization
- Create sandbox organization
- Empty organization name
- Very long organization name
- Special characters in name
- Duplicate organization

### Project Tests
- Create new project
- Upload schools via Excel
- Empty project name
- Empty county
- Special characters in name
- Duplicate project

## CI/CD

Tests run automatically on GitHub Actions when:
- Code is pushed to main branch
- Pull request is created

See `.github/workflows/playwright.yml` for configuration.

## Configuration

Playwright configuration is in `playwright.config.js`. Key settings:
- Test directory: `tests/`
- Base URL: `https://nyansapofoundation-teaching-dashboa.vercel.app/`
- Reporter: HTML and JSON
- Timeout: 30 seconds per test

## Troubleshooting

### Tests fail to run
- Ensure all dependencies are installed: `npm install`
- Check Node.js version is v14 or higher

### Tests timeout
- Increase timeout in `playwright.config.js`
- Check network connectivity

### Authentication issues
- Verify test credentials in `fixtures/testdata.json`
- Check if the application is accessible

## Contributing

When adding new tests:
1. Add test data to `fixtures/testdata.json`
2. Create or update page objects in `pages/`
3. Add tests in appropriate file under `tests/`
4. Follow naming convention: `test.describe('Feature', async () => {`
5. Include comments explaining test steps

## License

This project is for internal use only.

