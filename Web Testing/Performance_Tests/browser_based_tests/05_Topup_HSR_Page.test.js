import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/g/honkai-star-rail/top-up?from=product-type-game-top-up')
    page.waitForSelector('.line-clamp-2 ')
    page.screenshot({path :'screenshots/05_Topup_HSR_Page.png'})
    sleep(3)
}