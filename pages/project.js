export class CreateProject {
    constructor(page){
        this.page = page;
        this.selectOrganization = page.getByRole('heading', { name: 'UATs' })
        this.createProjectButton = page.getByRole('button', { name: 'Create Project' })
        this.newProjectName = page.getByRole('textbox', { name: 'e.g., Read, count and shine' })
        this.newProjectCounty = page.getByRole('textbox', { name: 'e.g., Nairobi' })
        this.submitProjectButton = page.getByRole('button', { name: 'Submit' })
        this.selectProject =  page.getByRole('button', { name: 'View Dashboard' }).nth(1)
        this.clickOnActionsDropdown =  page.getByRole('button', { name: 'Actions' })
        this.selectAddSchools = page.getByRole('button', { name: 'Add Schools' })
        this.fileInput = page.locator('input[type="file"]')
        this.excelFilePath = 'fixtures/school_template (3).xlsx'

    }

    async createNewProject(newProjectName, newProjectCounty){
        //1. Select an organization
        await this.selectOrganization.click()
        
        //2. Go to Quick Guide
        await this.goToprojects.click()
        
        //3. Click on Create New Project button
        await this.createProjectButton.click()
        
        //4. Enter project name
        await this.newProjectName.click()
        await this.newProjectName.fill(newProjectName)
        
        //5. Enter project county
        await this.newProjectCounty.click()
        await this.newProjectCounty.fill(newProjectCounty)
        
        //6. Submit the project
        await this.submitProjectButton.click()
    }

    async createSchool(){
        //1.Select a project
        await this.selectProject.click()
        
        //2.Click on actions
        await this.clickOnActionsDropdown.click()
        
        //3.Select add schools
        await this.selectAddSchools.click()
        
        //4.Upload xlsx template
        await this.fileInput.setInputFiles(this.excelFilePath)
        
        //5.Submit template
        await this.submitProjectButton.click()
    }
}
