import {test, expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
import { CreateProject } from '../pages/project.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup', async ({page}) => {
    const actions = new CommonActions(page);
    await actions.navigate();
});

test.describe('Project Creation', async () => {
    
    test('create a new project', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Select an organization and create a new project
        await projectPage.createNewProject(
            testData.projects.projectName,
            testData.projects.projectCounty
        );
        
        // 3. Add assertion to verify project was created
        // const projectCreated = page.getByText(testData.projects.projectName);
        // await expect(projectCreated).toBeVisible();
    });

    test('create a new school by uploading excel file', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);``
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Select an organization
        await projectPage.selectOrganization.click();
        
        // 3. Go to Projects
        await projectPage.goToprojects.click();
        
        // 4. Create a new school by uploading excel file
        await projectPage.createSchool();
        
        // 5. Add assertion to verify schools were created
        // const successUploadMessage = page.getByText(/schools uploaded successfully|import successful/i);
        // await expect(successUploadMessage).toBeVisible();
    });

    // Edge case tests for project creation
    test('create project with empty name', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Try to create project with empty name
        await projectPage.createNewProject(
            testData.projects.emptyProjectName,
            testData.projects.projectCounty
        );
        
        // 3. Add assertion to verify error message is shown
        const emptyNameError = page.getByText('Project name is required');
        await expect(emptyNameError).toBeVisible();
    });

    test('create project with empty county', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Try to create project with empty county
        await projectPage.createNewProject(
            testData.projects.projectName,
            testData.projects.emptyProjectCounty
        );
        
        // 3. Add assertion to verify error message is shown
        const emptyCountyError = page.getByText('County is required');
        await expect(emptyCountyError).toBeVisible();
    });

    test('create project with special characters in name', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Try to create project with special characters in name
        await projectPage.createNewProject(
            testData.projects.specialCharProjectName,
            testData.projects.projectCounty
        );
        
        // 3. Add assertion to verify error message is shown
        const specialCharError = page.getByText('Project name cannot contain special characters');
        await expect(specialCharError).toBeVisible();
    });

    test('create duplicate project', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Try to create duplicate project
        await projectPage.createNewProject(
            testData.projects.duplicateProjectName,
            testData.projects.projectCounty
        );
        
        // 3. Add assertion to verify error message is shown
        const duplicateError = page.getByText('Project already exists');
        await expect(duplicateError).toBeVisible();
    });
});

