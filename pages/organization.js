export class CreateOrganization {
    constructor(page){
        this.page = page;
        this.addOrganizationButton = page.getByRole('button', { name: 'Add Organization' })
        this.organizationNameInput = page.getByRole('textbox', { name: 'Organization Name' })
        this.createSandboxCheckbox = page.getByRole('checkbox', { name: 'Create Sandbox Organization' })
        this.submitOrganizationButton = page.getByRole('button', { name: 'Create Organization' })
    }

    
    async createNewOrganization(organizationName, createSandbox = false){
        //1. Click on Add Organization button
        await this.addOrganizationButton.click()
        
        //2. Enter organization name
        await this.organizationNameInput.click()
        await this.organizationNameInput.fill(organizationName)
        
        //3. Optionally check the sandbox checkbox
        if (createSandbox) {
            await this.createSandboxCheckbox.check()
        }
        
        //4. Submit the organization creation
        await this.submitOrganizationButton.click()
    }
}
