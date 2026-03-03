import {test, expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
import {CreateOrganization} from '../pages/organization.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup', async ({page}) => {
    const actions = new CommonActions(page);
    await actions.navigate();
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

    // Edge case tests for organization creation
    test('create organization with empty name', async ({page}) => {
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
        
        // 2. Try to create organization with empty name
        await organizationPage.createNewOrganization(
            testData.organization.emptyOrganizationName,
            false
        );
        
        // 3. Add assertion to verify error message is shown
        const emptyNameError = page.getByText('Organization name is required');
        await expect(emptyNameError).toBeVisible();
    });

    test('create organization with very long name', async ({page}) => {
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
        
        // 2. Try to create organization with very long name
        await organizationPage.createNewOrganization(
            testData.organization.longOrganizationName,
            false
        );
        
        // 3. Add assertion to verify error message is shown
        const longNameError = page.getByText('Organization name is too long');
        await expect(longNameError).toBeVisible();
    });

    test('create organization with special characters in name', async ({page}) => {
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
        
        // 2. Try to create organization with special characters in name
        await organizationPage.createNewOrganization(
            testData.organization.specialCharOrganizationName,
            false
        );
        
        // 3. Add assertion to verify error message is shown
        const specialCharError = page.getByText('Organization name cannot contain special characters');
        await expect(specialCharError).toBeVisible();
    });

    test('create duplicate organization', async ({page}) => {
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
        
        // 2. Try to create duplicate organization
        await organizationPage.createNewOrganization(
            testData.organization.duplicateOrganizationName,
            false
        );
        
        // 3. Add assertion to verify error message is shown
        const duplicateError = page.getByText('Organization already exists');
        await expect(duplicateError).toBeVisible();
    });
});
