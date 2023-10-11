const halaman = require('./halaman')
const {By} = require('selenium-webdriver')

class akun extends halaman {

    constructor(driver) {
        super(driver)
    } 

    openakun = By.xpath('//div[@class="false"]/div/div/div/div[3]')
    tambah = By.xpath('//div[@class="flex w-full"]/button')
    //buka page beli akun

    belilangsung = By.xpath('//div[@class="space-y-5 py-4"]/div[4]/div[2]/div[2]')
    //proses

    async bukatabakun() {
        await this.driver.findElement(this.openakun).click()
    }


    async add() {
        await this.driver.findElement(this.tambah).click()
    }

    async langsung() {
        await this.driver.findElement(this.belilangsung).click()
    }
}

module.exports = akun