import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/login/email')
    page.waitForSelector('.px-4')
    page.fill('.ds-pr-1.ds-px-1', 'migosag692@hapincy.com')
    page.fill('.ds-pl-1.ds-pr-9 ', 'kamal123*')
    page.click('.ds-items-center.false')
    page.screenshot({path :'screenshots/03_Login_Email_page.png'})
    sleep(3)
}


//login with email