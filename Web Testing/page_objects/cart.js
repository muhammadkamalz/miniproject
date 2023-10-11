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

    cartdata1 = By.xpath('//div[@class="space-y-6"]/div/div[@class="w-full"]') //to check if an item is added or not
    cartdata2 = By.xpath('//div[contains(@class,"w-full text-center text-xl")]') //to check if an item is in cart or not
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
        return await this.driver.findElement(this.cartdata1).isDisplayed()
    }

    async check2() {
        return await this.driver.findElement(this.cartdata2).getText()
    }

    async continue () {
        await this.driver.findElement(this.confirm).click()
    }
}

module.exports = cart