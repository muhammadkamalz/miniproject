import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/login')
    page.waitForSelector('.mx-auto.mt-8')
    page.screenshot({path :'screenshots/02_Login_page.png'})
    sleep(3)
}