const halaman = require('./halaman')
const{By} = require('selenium-webdriver')

class cart extends halaman {
    constructor(driver) {
        super(driver)
    }
    //constructor

    troli = By.id('cart-icon')
    bukatroli = By.xpath('//div[contains(@class, "sticky")]//a')
    //buka cart

    cartdata1 = By.xpath('//div[@class="space-y-2 flex flex-col"]/p')
    //forcheckingpurpose

    confirm = By.xpath('//div[@class="relative w-4/12"]//button')
    //buttons

    async open1() {
        await this.driver.findElement(this.troli).click()
    }

    async opencart() {
        await this.driver.findElement(this.bukatroli).click()
    }

    async check1() {
        return await this.driver.findElement(this.cartdata1).getText()
    }

    async continue () {
        await this.driver.findElement(this.confirm).click()
    }
}

module.exports = cart