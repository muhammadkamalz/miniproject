const halaman = require('./halaman')
const {By} = require('selenium-webdriver')

class belicurrency extends halaman {
    constructor(driver) {
        super(driver)
    }

    opencurr = By.xpath('//div[@class="false"]/div/div/div/div[5]')
    tambahnama = By.xpath('//div[@class="ds-relative ds-w-full"]/input[contains(@placeholder, "Nama")]')
    tambah = By.xpath('//div[@class="flex w-full"]/button')
    

    async bukatabcurr() {
        await this.driver.findElement(this.opencurr).click()
    }

    async add() {
        await this.driver.findElement(this.tambah).click()
    }
    
    async input(name) {
        await this.driver.findElement(this.tambahnama).clear()
        await this.driver.findElement(this.tambahnama).sendKeys(name)
    }
}

module.exports = belicurrency