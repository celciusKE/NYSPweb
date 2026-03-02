# Replace page locator with navigate object in CommonActions

## Files Updated:
- [x] tests/login.js - Replaced page.goto() with actions.navigate()
- [x] tests/organization.js - Replaced page.goto() with actions.navigate()
- [x] tests/project.js - Replaced page.goto() with actions.navigate()
- [x] tests/assessments.js - Replaced page.goto() with actions.navigate()

## Changes Made:
- In beforeEach hooks, created CommonActions instance and called navigate() method instead of page.goto()
- All test files now use the navigate() method from CommonActions for navigation
