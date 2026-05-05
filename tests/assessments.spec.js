import {test, expect} from '@playwright/test';
import CommonActions from '../support/CommonActions.helper.js';
import { CreateProject } from '../support/pages/project.po.js';
import { CreateAssessments } from '../support/pages/instructors.po.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup', async ({page}) => {
    const actions = new CommonActions(page);
    await actions.navigate();
});

test.describe('Assessment Creation', async () => {
    
    // Positive Test Case
    test('create a new assessment with valid data', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        const assessmentsPage = new CreateAssessments(page);
        
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
        
        // 3. Create a new assessment with valid data
        // (createNewAssessment method already handles navigation to assessments)
        await assessmentsPage.createNewAssessment(
            testData.assessments.validAssessment.assessmentName,
            testData.assessments.validAssessment.projectName,
            testData.assessments.validAssessment.schoolName,
            testData.assessments.validAssessment.assessmentType
        );
        
        // 4. Add assertion to verify assessment was created
        const assessmentCreated = page.getByText(testData.assessments.validAssessment.assessmentName);
        await expect(assessmentCreated).toBeVisible();
    });

    // Negative Test Cases
    test('create assessment with empty name - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
          // 2. Select an organization
        await projectPage.selectOrganization.click()

        // 3. Navigate to assessments section
        await assessmentsPage.gotoAssessments.click();

        // 4. Click on add new assessments
        await assessmentsPage.addNewAssessments.click();
        
        // 5. Try to create assessment with empty name
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.emptyName.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 6. Verify validation error is shown
        const validationError = page.getByText('Please enter an assessment');
        await expect(validationError).toBeVisible();
    });

    test('create assessment with special characters in name - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // 2.Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
          // 3. Select an organization
        await projectPage.selectOrganization.click()

        // 4. Navigate to assessments section
        await assessmentsPage.gotoAssessments.click();

        // 5. Click on add new assessments
        await assessmentsPage.addNewAssessments.click();
        
        // 6. Try to create assessment with special characters
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.specialCharactersName.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Verify validation error is shown
        const validationError = page.getByText(/invalid characters|special characters not allowed/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment with very long name - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
          // 2. Select an organization
        await projectPage.selectOrganization.click()

        // 3. Navigate to assessments section
        await assessmentsPage.gotoAssessments.click();

        // 4. Click on add new assessments
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Try to create assessment with very long name
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.veryLongName.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Verify validation error is shown (character limit exceeded)
        const validationError = page.getByText(/character limit|name too long|maximum characters/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment with duplicate name - should show error', async ({page}) => {
        const actions = new CommonActions(page);
        const projectPage = new CreateProject(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
          // 2. Select an organization
        await projectPage.selectOrganization.click()

        // 3. Navigate to assessments section
        await assessmentsPage.gotoAssessments.click();

        // 4. Click on add new assessments
        await assessmentsPage.addNewAssessments.click();
        
        // 5. Try to create assessment with duplicate name
        await assessmentsPage.createNewAssessment(
            testData.assessments.duplicateName.assessmentName,
            testData.assessments.duplicateName.projectName,
            testData.assessments.duplicateName.schoolName,
            testData.assessments.duplicateName.assessmentType
        );
        
        // 4. Verify error message is shown (assessment already exists)
        const errorMessage = page.getByText(/assessment already exists|duplicate assessment/i);
        await expect(errorMessage).toBeVisible();
    });

});
