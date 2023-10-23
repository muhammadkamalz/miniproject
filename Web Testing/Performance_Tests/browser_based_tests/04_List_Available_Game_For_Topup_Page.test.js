import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/c/tipe-produk/top-up-game')
    page.waitForSelector('.mt-6.space-y-3')
    page.screenshot({path :'screenshots/04_List_Available_Game_For_Topup_Page.png'})
    sleep(3)
}
//topup page