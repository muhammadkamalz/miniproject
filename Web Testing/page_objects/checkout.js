const halaman = require('./halaman')
const {By} = require('selenium-webdriver')

class checkout extends halaman {
    constructor(driver){
        super(driver)
    }

    metodepembayaran = By.xpath('//div[@class="flex justify-between items-center"]/button')
    dana = By.xpath('//div[@class="w-full space-y-4"][1]/div[1]/label[1]/label[1]/div[1]/div')
    confirmmetode = By.xpath('//div[@class="ds-flex ds-flex-row-reverse"]/span[contains(text(), "Pilih Metode Pembayaran")]')
    //select payment method

    checkitem = By.xpath('//div[@class="flex"][1]/div//h2')
    checkuid = By.xpath('//div[@class="flex flex-col gap-1 w-1/4"][1]/p')
    checkserver = By.xpath('//div[@class="flex flex-col gap-1 w-1/4"][2]/p')
    checkmetode = By.xpath('//p[contains(text(), "DANA Linkage")]')
    //checking purpose

    async selectpayment() {
        await this.driver.findElement(this.metodepembayaran).click()
    }

    async selectdana() {
        await this.driver.findElement(this.dana).click()
    }

    async confirmpayment() {
        await this.driver.findElement(this.confirmmetode).click()
    }

    async checker1(){
        return await this.driver.findElement(this.checkitem).getText()
    }

    async checker2(){
        return await this.driver.findElement(this.checkuid).getText()
    }

    async checker3(){
        return await this.driver.findElement(this.checkserver).getText()
    }

    async checker4() {
        return await this.driver.findElement(this.checkmetode).getText()
    }


}

module.exports = checkout