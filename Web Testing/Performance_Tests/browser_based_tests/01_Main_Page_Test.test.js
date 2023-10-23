import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/')
    page.waitForSelector('.snap-start')
    page.screenshot({path :'screenshots/01_Main_page.png'})
    sleep(3)
}

//mainpage