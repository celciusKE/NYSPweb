import {test,expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js'
import {LoginPage, SignupPage} from '../pages/userlogin.js';
import testData from '../fixtures/testdata.json' assert { type: "json" };

test.beforeEach('Setup',async({page})=>{
    await page.goto('https://nyansapofoundation-teaching-dashboa.vercel.app/')
})
//1.Login Process
test.describe('Login in process', async () => {

test('valid user login', async ({ page }) => {
    const actions = new CommonActions(page)
    //user can login in with valid credentials
    await actions.login(
        testData.users.validUser.phoneNumber,
        testData.users.validUser.pin
    )
    // Assertions use the expect success response
    const successMessage = page.getByText('Login successful! Redirecting')
    await expect(successMessage).toBeVisible()
    });

test('invalid phone number login',async({page})=>{
    const actions = new CommonActions(page)
    await actions.login(
        testData.users.invalidPhoneNumber.phoneNumber,
        testData.users.invalidPhoneNumber.pin
    )
    const invalidLoginError = page.getByText('Number not registered')
    //assertion
    await expect(invalidLoginError).toBeVisible()
})
test('Valid phone number invalid Pin',async({page})=>{
    const actions = new CommonActions(page)
    await actions.login(
        testData.users.invalidPin.phoneNumber,
         testData.users.invalidPin.pin
        )
    const invalidPinError = page.getByText('Invalid credentials')
    //assertion
    await expect(invalidPinError).toBeVisible()
})
test('Missing mandatory fields during login:phone number',async({page})=>{
     const actions = new CommonActions(page)
    await actions.login(
        testData.users.emptyPhoneNumber.phoneNumber,
         testData.users.emptyPhoneNumber.pin
        )
    const MissingPhoneNumError = page.getByText('Phone number is required')
    //assertion
    await expect(MissingPhoneNumError).toBeVisible()
})
test('Missing mandatory fields during login:pin',async({page})=>{
     const actions = new CommonActions(page)
    await actions.login(
        testData.users.emptyPin.phoneNumber,
        testData.users.emptyPin.pin
    )
    const MissingPinNumError = page.getByText('PIN is required')
    //assertion
    await expect(MissingPinNumError).toBeVisible()
})

})

//2.Sign Up process
test.describe('Verify sign up process',async()=>{
    test('valid user sign up for an account',async({page})=>{
        const userSignUp = new SignupPage(page)
        await userSignUp.signup(
            testData.signup.validUser.name,
            testData.signup.validUser.email,
            testData.signup.validUser.phoneNumber,
            testData.signup.validUser.pin,
            testData.signup.validUser.confirmPin
        )
        const successSignUpMessage = page.getByText('Phone already registered')
        await expect(successSignUpMessage).toBeVisible()
    })
   
})
