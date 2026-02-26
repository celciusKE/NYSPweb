export class Instructors {
    constructor(page){
        this.page = page;
        
        // Navigation elements
        this.selectInstructor = page.getByRole('button', { name: 'Instructors' });
        this.searchForInstructor = page.getByRole('textbox', { name: 'Search by name, email, or' })
        
        // Actions elements
        this.clickEllipsis = page.getByRole('button').filter({ hasText: /^$/ }).nth(1)
        this.updateAssignment = page.getByRole('button', { name: 'Update Assignment' }).nth(1)
        
        // Dropdown elements
        this.selectDropdown = page.locator('.css-8mmkcg').first()
        this.selectUpdatedOrganization = page.getByRole('option', { name: 'QA Tests' })
        this.selectProjectsDropdown = page.locator('div:nth-child(3) > .basic-multi-select > .select__control > .select__indicators > .select__indicator > .css-8mmkcg')
        this.selectProjectOption = page.locator('#react-select-6-option-2')
        this.selectSchoolDropdown =  page.locator('div:nth-child(4) > .basic-multi-select > .select__control > .select__indicators > .select__indicator > .css-8mmkcg > path')
        this.selectSchoolOption = page.getByRole('option', { name: 'School A' })
        
        // Role management elements
        this.selectUpdateRole = page.getByRole('button', { name: 'Update Role' }).nth(1)
        this.updateToAdmin = page.getByRole('combobox').nth(2)
        
        // Delete elements
        this.unassignOrganization = page.getByRole('button', { name: 'Unassign from Org' }).nth(1)
        this.deleteInstructor = page.getByRole('button', { name: 'Delete Instructor' }).nth(1)
    }

    /**
     * Updates instructor assignment by selecting organization, project, and school
     * @param {string} organizationName - Name of the organization to assign
     * @param {string} projectName - Name of the project to assign
     * @param {string} schoolName - Name of the school to assign
     */
    async updateAssignment(organizationName, projectName, schoolName){
        //1. Click on Update Assignment button
        await this.updateAssignment.click()
        
        //2. Select organization from dropdown
        await this.selectDropdown.click()
        await this.selectUpdatedOrganization.click()
        
        //3. Select project from dropdown
        await this.selectProjectsDropdown.click()
        await this.selectProjectOption.click()
        
        //4. Select school from dropdown
        await this.selectSchoolDropdown.click()
        await this.selectSchoolOption.click()
    }

    /**
     * Updates the role of an instructor to the specified role
     * @param {string} newRole - The new role to assign (e.g., 'Admin', 'Instructor')
     */
    async updateRole(newRole){
        //1. Click on Update Role button
        await this.selectUpdateRole.click()
        
        //2. Select the new role from combobox
        await this.updateToAdmin.click()
        await this.updateToAdmin.fill(newRole)
        
        //3. Confirm the role update (assuming there's a submit button)
        await this.page.getByRole('button', { name: 'Save' }).click()
    }

    /**
     * Deletes an instructor from the system
     * @param {boolean} confirmDelete - Whether to confirm the deletion
     */
    async deleteInstructor(confirmDelete = true){
        //1. Click on Delete Instructor button
        await this.deleteInstructor.click()
        
        //2. Confirm deletion if required
        if (confirmDelete) {
            await this.page.getByRole('button', { name: 'Confirm' }).click()
        }
    }

    /**
     * Searches for an instructor by name, email, or other criteria
     * @param {string} searchTerm - The search term to find an instructor
     */
    async searchInstructor(searchTerm){
        //1. Enter search term
        await this.searchForInstructor.click()
        await this.searchForInstructor.fill(searchTerm)
    }
}

export class CreateAssessments {
    constructor(page){
        this.page = page;
        
        // Assessment creation elements
        this.gotoAssessments = page.getByRole('button', { name: 'Assessments' })
        this.addNewAssessments = page.getByRole('button', { name: 'Add Assessment' })
        this.enterAssessmentName = page.getByRole('textbox', { name: 'e.g., Q1_2024, Term1_Math,' })
        this.gotoNext = page.getByRole('button', { name: 'Next' })
        this.selectAssessmentProject = page.locator('form').getByRole('combobox')
        this.selectAssessmentSchool = page.getByText('School B0 students').first()
        this.selectAssessmentType = page.locator('form span').filter({ hasText: 'Numeracy' })
        this.createNewAssessments = page.getByRole('button', { name: 'Create Assessments' })
    }

    /**
     * Creates a new assessment with the specified details
     * @param {string} assessmentName - Name for the assessment
     * @param {string} projectName - Project to associate with the assessment
     * @param {string} schoolName - School to associate with the assessment
     * @param {string} assessmentType - Type of assessment (e.g., 'Numeracy')
     */
    async createNewAssessment(assessmentName, projectName, schoolName, assessmentType){
        //1. Click on Add Assessment button
        await this.gotoAssessments.click()
        await this.addNewAssessments.click()
        
        //2. Enter assessment name
        await this.enterAssessmentName.click()
        await this.enterAssessmentName.fill(assessmentName)
        
        //3. Click Next to proceed
        await this.gotoNext.click()
        
        //4. Select assessment project
        await this.selectAssessmentProject.click()
        await this.selectAssessmentProject.selectOption('cOcPsaoXMj6AayHlapyS')
        
        //5. Select assessment school
        await this.selectAssessmentSchool.click()
        
        //6. Select assessment type
        await this.selectAssessmentType.click()
        
        //7. Create the assessment
        await this.createNewAssessments.click()
    }
}
