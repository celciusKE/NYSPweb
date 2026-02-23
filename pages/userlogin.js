exports.LoginPage=
class LoginPage {
    constructor(page){
        this.page = page;
        this.clickOnCountryCode = page.getByRole('button', { name: '🇰🇪 +' })
        this.selectCountryCode = page.getByRole('button', { name: '🇰🇪 +254 Kenya' })
        this.enterPhoneNumber = page.getByRole('textbox', { name: '0712345678' })
        this.enterPin = page.getByRole('textbox', { name: 'Enter 6-digit PIN' })
        this.submitLogin = page.getByRole('button', { name: 'Login with PIN' })  
    }
    async navigate(){
        //await this.page.pause()
        await this.page.goto('https://nyansapofoundation-teaching-dashboa.vercel.app/')
    }
    //User login
    async login(phoneNumber, pin){
        //1.enter phonenumber
        await this.clickOnCountryCode.click()
        await this.selectCountryCode.click()
        await this.enterPhoneNumber.click()
        await this.enterPhoneNumber.fill(phoneNumber)
        //2.enter pin
        await this.enterPin.click()
        await this.enterPin.fill(pin)
        //3.submit
        await this.submitLogin.click()

    }
}
exports.SignupPage =
class SignupPage {
    constructor(page){
        this.page = page;
        this.clickOnCountryCode = page.getByRole('button', { name: '🇰🇪 +' })
        this.goToSignUpPage =page.getByRole('link', { name: 'Sign up here'})
        this.name = page.getByRole('textbox', { name: 'Enter your name' })
        this.email = page.getByRole('textbox', { name: 'Enter email' })
        this.selectCountryCode =  page.getByRole('button', { name: '🇰🇪 +254 Kenya' })
        this.phoneNumber = page.getByRole('textbox', { name: 'or 796175283' })
        this.pin = page.getByRole('textbox', { name: 'Enter 6-digit PIN' })
        this.confirmpin = page.getByRole('textbox', { name: 'Confirm 6-digit PIN' })
        this.submitSignup= page.getByRole('button', { name: 'Sign Up' })
    }
    async navigate(){
        //await this.page.pause()
        await this.page.goto('https://nyansapofoundation-teaching-dashboa.vercel.app/')
    }
    //User signup
    async signup(name, email, phoneNumber, pin, confirmPin){
        //1.navigate to page
        await this.goToSignUpPage.click()
        //2.enter name
        await this.name.fill(name)
        //3.enter email
        await this.email.fill(email)
        //4.select countryCode
        await this.clickOnCountryCode.click()
        await this.selectCountryCode.click()
        //5.enter phone number
        await this.phoneNumber.fill(phoneNumber)
        //6.enter pin
        await this.pin.fill(pin)
        //7.confirm pin
        await this.confirmpin.fill(confirmPin)
        //8.submit sign up
        await this.submitSignup.click()

    }
}
