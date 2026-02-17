import {test,expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions'
import {LoginPage, SignupPage} from '../pages/userlogin';

test.beforeEach('Setup',async({page,baseURL})=>{
    await page.goto('')
})
//1.Login Process
test.describe('Login in process', async () => {

test('valid user login', async ({ page }) => {
    const actions = new CommonActions(page)
    //user can login in with valid credentials
    await actions.login('','')
    // Assertions use the expect success response
    const successMessage = page.getByText('Login successful! Redirecting')
    await expect(successMessage).toBeVisible()
    });

test('invalid phone number login',async({page})=>{
    const actions = new CommonActions(page)
        await actions.login('','')
    const invalidLoginError = page.getByText('Number not registered')
    //assertion
    await expect(invalidLoginError).toBeVisible()
})
test('Valid phone number invalid Pin',async({page})=>{
    const actions = new CommonActions(page)
    await actions.login('','')
    const invalidPinError = page.getByText('Invalid credentials')
    //assertion
    await expect(invalidPinError).toBeVisible()
})
test('Missing mandatory fields during login:phone number',async({page})=>{
     const actions = new CommonActions(page)
    await actions.login('','')
    const MissingPhoneNumError = page.getByText('Phone number is required')
    //assertion
    await expect(MissingPhoneNumError).toBeVisible()
})
test('Missing mandatory fields during login:pin',async({page})=>{
     const actions = new CommonActions(page)
    await actions.login('','')
    const MissingPinNumError = page.getByText('PIN is required')
    //assertion
    await expect(MissingPinNumError).toBeVisible()
})
// test('valid user log out',async({page})=>{
//     //user can Log out successfully
//     const actions = new CommonActions(page)
//     //user can login in with valid credentials
//     await actions.login('+254754321000','123456')
//     // Assertions use the expect success response
//     // const successMessage = page.getByText('Login successful! Redirecting')
//     // await expect(successMessage).toBeVisible()
//     //Log out of app
//     await actions.logout()
//     //confirm successful logout
//     await expect(page).toHaveURL('https://nyansapofoundation-teaching-dashboa.vercel.app/');
// });

})

//2.Sign Up process
test.describe('Verify sign up process',async()=>{
    test('valid user sign up for an account',async({page})=>{
        const userSignUp = new SignupPage(page)
        await userSignUp.signup()
        const successSignUpMessage = page.getByText('Phone already registered')
        await expect(successSignUpMessage).toBeVisible()
    })
   
})