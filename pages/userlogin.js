exports.LoginPage=
class LoginPage {
    constructor(page){
        this.page = page;
        this.enterPhoneNumber = page.getByRole('textbox', { name: 'e.g. +' })
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
        await this.enterPhoneNumber.click()
        await this.enterPhoneNumber.fill()
        //2.enter pin
        await this.enterPin.click()
        await this.enterPin.fill()
        //3.submit
        await this.submitLogin.click()

    }
}
exports.SignupPage =
class SignupPage {
    constructor(page){
        this.page = page;
        this.goToSignUpPage =page.getByRole('link', { name: 'Sign up here'})
        this.name = page.getByRole('textbox', { name: 'Enter your name' })
        this.email = page.getByRole('textbox', { name: 'Enter email' })
        this.phoneNumber = page.getByRole('textbox', { name: 'e.g., +' })
        this.pin = page.getByRole('textbox', { name: 'Enter 6-digit PIN' })
        this.confirmpin = page.getByRole('textbox', { name: 'Confirm 6-digit PIN' })
        this.submitSignup= page.getByRole('button', { name: 'Sign Up' })
    }
    async navigate(){
        //await this.page.pause()
        await this.page.goto(url)
    }
    //User login
    async signup(randomname,randomemail,randomphone,randompin,randomconfirmpin){
        //1.navigate to page
        await this.goToSignUpPage.click()
        //2.enter name
        await this.name.fill()
        //3.enter email
        await this.email.fill()
        //4.enter phone number
        await this.phoneNumber.fill()
        //5.enter pin
        await this.pin.fill()
        //6.confirm pin
        await this.confirmpin.fill()
        //7.submit sign up
        await this.submitSignup.click()

    }
}