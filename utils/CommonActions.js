import { Page } from '@playwright/test';

export default class CommonActions{
    constructor(page){
        this.page = page
        this.enterPhoneNumber = page.getByRole('textbox', { name: 'e.g. +' })
        this.enterPin = page.getByRole('textbox', { name: 'Enter 6-digit PIN' })
        this.submitLogin = page.getByRole('button', { name: 'Login with PIN' }) 
        this.goToSignUpPage =page.getByRole('link', { name: 'Sign up here'})
        this.name = page.getByRole('textbox', { name: 'Enter your name' })
        this.email = page.getByRole('textbox', { name: 'Enter email' })
        this.phoneNumber = page.getByRole('textbox', { name: 'e.g., +' })
        this.pin = page.getByRole('textbox', { name: 'Enter 6-digit PIN' })
        this.confirmpin = page.getByRole('textbox', { name: 'Confirm 6-digit PIN' })
        this.submitSignup= page.getByRole('button', { name: 'Sign Up' })
        this.logoutButton =page.getByRole('button', { name: 'Sign Up' })
    
    }

    async navigate(url){
        //await this.page.pause()
        await this.page.goto(url)
    }

    async login(phoneNumber, pin){
        //1.enter phonenumber
        await this.enterPhoneNumber.click()
        await this.enterPhoneNumber.fill(phoneNumber)
        //2.enter pin
        await this.enterPin.click()
        await this.enterPin.fill(pin)
        //3.submit
        await this.submitLogin.click()
    }

     async signup(randomname,randomemail,randomphone,randompin,randomconfirmpin){
        //1.navigate to page
        await this.goToSignUpPage.click()
        //2.enter name
        await this.name.fill(fulllnames)
        //3.enter email
        await this.email.fill('testuser1@gmail.com')
        //4.enter phone number
        await this.phoneNumber.fill(selector , phoneNumber)
        //5.enter pin
        await this.pin.fill(pin)
        //6.confirm pin
        await this.confirmpin.fill(pin)
        //7.submit sign up
        await this.submitSignup.click()

    }

    async logout(){
        await this.logoutButton.click()
    }

}