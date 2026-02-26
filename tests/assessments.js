import {test, expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
import { CreateProject } from '../pages/project.js';
import { CreateAssessments } from '../pages/instructors.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup', async ({page}) => {
    await page.goto('https://nyansapofoundation-teaching-dashboa.vercel.app/');
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
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Try to create assessment with empty name
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.emptyName.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Verify validation error is shown
        const validationError = page.getByText(/assessment name is required|please enter a valid name/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment with special characters in name - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Try to create assessment with special characters
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.specialCharactersName.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Verify validation error is shown
        const validationError = page.getByText(/invalid characters|special characters not allowed/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment with very long name - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
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
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Try to create assessment with duplicate name
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

    test('create assessment without selecting project - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Enter assessment name
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.noProject.assessmentName);
        
        // 4. Try to proceed without selecting project
        await assessmentsPage.gotoNext.click();
        
        // 5. Verify validation error is shown
        const validationError = page.getByText(/please select a project|project is required/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment without selecting school - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Enter assessment name and select project
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.noSchool.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Try to proceed without selecting school
        await assessmentsPage.selectAssessmentProject.click();
        await assessmentsPage.selectAssessmentProject.fill(testData.assessments.noSchool.projectName);
        
        // 5. Try to create without school
        await assessmentsPage.createNewAssessments.click();
        
        // 6. Verify validation error is shown
        const validationError = page.getByText(/please select a school|school is required/i);
        await expect(validationError).toBeVisible();
    });

    test('create assessment without selecting assessment type - should show validation error', async ({page}) => {
        const actions = new CommonActions(page);
        const assessmentsPage = new CreateAssessments(page);
        
        // 1. Login with valid credentials
        await actions.login(
            testData.users.validUser.phoneNumber,
            testData.users.validUser.pin
        );
        
        // Wait for successful login
        const successMessage = page.getByText('Login successful! Redirecting');
        await expect(successMessage).toBeVisible();
        
        // 2. Navigate to assessments section
        await assessmentsPage.addNewAssessments.click();
        
        // 3. Enter assessment name
        await assessmentsPage.enterAssessmentName.click();
        await assessmentsPage.enterAssessmentName.fill(testData.assessments.noAssessmentType.assessmentName);
        await assessmentsPage.gotoNext.click();
        
        // 4. Select project and school
        await assessmentsPage.selectAssessmentProject.click();
        await assessmentsPage.selectAssessmentProject.fill(testData.assessments.noAssessmentType.projectName);
        await assessmentsPage.selectAssessmentSchool.click();
        
        // 5. Try to create without selecting assessment type
        await assessmentsPage.createNewAssessments.click();
        
        // 6. Verify validation error is shown
        const validationError = page.getByText(/please select an assessment type|assessment type is required/i);
        await expect(validationError).toBeVisible();
    });
});
