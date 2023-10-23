import{sleep} from 'k6'

export default async (page) => {
    await page.goto('https://itemku.com/c/tipe-produk/akun')
    page.waitForSelector('.mt-6.space-y-3')
    page.screenshot({path :'screenshots/06_Produk_Akun_Page.png'})
    sleep(3)
}

//available game to buy account