const {By, Key} = require('selenium-webdriver')
const halaman = require('./halaman')

class pulsa extends halaman {

    constructor(driver){
        super(driver)
    }

    tombolright = By.xpath('//div[contains(@class, "relative flex items-center px-5 -ml-5")]/div[contains(@class, "absolute h-full flex ")][2]')
    tabpulsa = By.xpath('//div[@class="false"]/div/div/div/div[9]')
    nohp = By.xpath('//div[@class="ds-relative ds-w-full"]/input[contains(@placeholder, "Nomor Handphone")]')
    tambah = By.xpath('//div[@class="flex w-full"]/button')
 
    async geserlist() {
        await this.driver.findElement(this.tombolright).click()
    }

    async bukatabpulsa() {
        await this.driver.findElement(this.tabpulsa).click()
    }

    async clearinput() {
        await this.driver.findElement(this.nohp).actions().keyRight(Key.BACK_SPACE)
    }

    async input(nomor) {
        await this.driver.findElement(this.nohp).clear()
        await this.driver.findElement(this.nohp).sendKeys(nomor)
    }

    async add() {
        await this.driver.findElement(this.tambah).click()
    }


    
}

module.exports = pulsa