const halaman = require('./halaman')
const{By} = require('selenium-webdriver')

class topup extends halaman {
    constructor(driver){
        super(driver)
    }

    opentopup = By.xpath('//div[@class="false"]/div/div/div/div[1]')
    hsr = By.xpath('//p[contains(text(), "Honkai: Star Rail")]')
    pilihan1 = By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')
    //opening item page


    uid = By.xpath('//div[@class="space-y-5 py-4"]/div[1]//input[contains(@placeholder, "Contoh: 801311343")]')
    server = By.xpath('//div[@class="space-y-5 py-4"]/div[1]//input[contains(@placeholder, "Contoh: Asia")]')
    noteforseller = By.xpath('//div[@class="space-y-5 py-4"]//div[@class="w-full z-0 ds-flex ds-flex-col"]/div/input')

    //data for buying

    tambahketroli = By.xpath('//div[@class="space-y-5 py-4"]/div[4]/div[2]/div[1]')
    tambahlangsung = By.xpath('//div[@class="space-y-5 py-4"]/div[4]/div[2]/div[2]')
    increase = By.xpath('//div[@class="space-y-5 py-4"]/div[2]/div//button[@aria-label="Increase Quantity"]')
    decrease = By.xpath('//div[@class="space-y-5 py-4"]/div[2]/div//button[@aria-label="Decrease Quantity"]')
    jumlah = By.xpath('//input[contains(@aria-label,"Quantity")]')
    sisa = By.xpath('//p[contains(text(),"Tersisa")]')
    //buying


    checkitem = By.xpath('//div[@class="w-full space-y-4"]/div/div/div/h1')
    checkifadded = By.xpath('//div[contains(@class, "flex flex-col justify-center")]/div//span')
    //for checking purposes
    

    async open () {
        await this.driver.findElement(this.opentopup).click()
    }

    async openhsr() {
        await this.driver.findElement(this.hsr).click()
    }

    async buy1() {
      return await this.driver.findElement(this.pilihan1)
    }


    async input(uidata, serverdata ){
        await this.driver.findElement(this.uid).clear()
        await this.driver.findElement(this.uid).sendKeys(uidata)
        await this.driver.findElement(this.server).clear()
        await this.driver.findElement(this.server).sendKeys(serverdata)
    }

    async add(){
        await this.driver.findElement(this.tambahketroli).click()
    }

    async instantadd(){
        await this.driver.findElement(this.tambahlangsung).click()
    }

    async checker1() {
        return await this.driver.findElement(this.checkItem).getText()
    }

    async checker2() {
        return await this.driver.findElement(this.checkifadded).getText()
    }

    async tambahproduk() {
        await this.driver.findElement(this.increase).click()
    }

    async kurangiproduk(){
        await this.driver.findElement(this.decrease).click()
    }

    async cekinfotambahproduk(){
        return await this.driver.findElement(this.increase).getAttribute('disabled')
    }

    async cekinfokurangiproduk(){
        return await this.driver.findElement(this.decrease).getAttribute('disabled')
    }

    async cekjumlah() {
        return await this.driver.findElement(this.jumlah).getAttribute('value')
    }


    async cekstok() {
        const harga = await this.driver.findElement(this.sisa).getText()
        const matcharga = harga.match(/\d+/)
        const convertharga = matcharga[0]
        return convertharga
    }

}

module.exports = topup