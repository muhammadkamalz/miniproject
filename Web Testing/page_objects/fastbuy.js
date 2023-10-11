const {By} = require('selenium-webdriver')
const halaman = require('./halaman')

class fast extends halaman {
    constructor (driver) {
        super(driver)
    }
    tabgenshin = By.xpath('//p[contains(text(), "Genshin Impact")]')
    uid = By.xpath('//input[contains(@placeholder, "Contoh: 800942687")]')
    serve = By.xpath('//input[contains(@placeholder, "Contoh: Asia")]')
    tombolbeli = By.xpath('//button//span[contains(text(), "Beli")]')
    checkitem = By.xpath('//a[@class="ds-cursor-default"]/h2')
    

    async bukatabgenshin() {
        await this.driver.findElement(this.tabgenshin).click()
    }

    async input (uniqueid, serverinfo){
        await this.driver.findElement(this.uid).clear()
        await this.driver.findElement(this.serve).clear()
        await this.driver.findElement(this.uid).sendKeys(uniqueid)
        await this.driver.findElement(this.serve).sendKeys(serverinfo)
    }

    async submit() {
        await this.driver.findElement(this.tombolbeli).click()
    }

    async checker1() {
        return await this.driver.findElement(this.checkitem).getText()
    }
}

module.exports = fast