import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/belanja-cepat/genshin-impact?from=qb_homepage&funnel_type=quick-buy-homepage')
    page.waitForSelector('.sticky.top-0')
    page.screenshot({path :'screenshots/07_Fastbuy_Product_Page.png'})
    sleep(3)
}