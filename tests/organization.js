import {test, expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
import {CreateOrganization} from '../pages/organization.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup', async ({page}) => {
    await page.goto('/');
});

test.describe('Organization Creation', async () => {
    
    test('create a new organization', async ({page}) => {
        const actions = new CommonActions(page);
        const organizationPage = new CreateOrganization(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Create a new organization
        await organizationPage.createNewOrganization(
            testData.organization.organizationName,
            false // createSandbox = false
        );
        
        // 3. Add assertion to verify organization was created
        // The success message or the organization name should be visible
        const organizationCreated = page.getByText(testData.organization.organizationName);
        await expect(organizationCreated).toBeVisible();
    });

    test('create a new sandbox organization', async ({page}) => {
        const actions = new CommonActions(page);
        const organizationPage = new CreateOrganization(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Create a new sandbox organization
        await organizationPage.createNewOrganization(
            'Sandbox Test Organization',
            true // createSandbox = true
        );
        
        // 3. Add assertion to verify organization was created
        const organizationCreated = page.getByText('Sandbox Test Organization');
        await expect(organizationCreated).toBeVisible();
    });
});
