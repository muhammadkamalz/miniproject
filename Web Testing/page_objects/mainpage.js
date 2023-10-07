const halaman = require('./halaman')
const{By} = require('selenium-webdriver')
class mainpage extends halaman {
    constructor(driver) {
        super(driver)
    }
    akunsaya = By.xpath('//div[contains (@class, "flex items-center space-x-4")]/div[2]/button')
    formcheck = By.xpath('//form[@id="login_form"]')
    loginwithemail = By.xpath('//div[@class="px-4"]/div/button')
    //open form

    mail = By.xpath('//div[@class="ds-relative ds-w-full"]//input[@type="text"]')
    pw = By.xpath('//div[@class="ds-relative ds-w-full"]//input[@type="password"]')
    confirm = By.xpath('//button[@type="submit"]/button')
    checkiflogin = By.xpath('//button[@class="flex"]/div/p')


    async open() {
        await this.buka()
    }

    async loginpage() {
        await this.driver.findElement(this.akunsaya).click()
    }

    async openloginpage() {
        await this.driver.findElement(this.loginwithemail).click()
    }
    async checkloginform() {
        return await this.driver.findElement(this.formcheck).isDisplayed()
    }

    async input(email, password) {
        await this.driver.findElement(this.mail).sendKeys(email)
        await this.driver.findElement(this.pw).sendKeys(password)
    }

    async submit() {
        await this.driver.findElement(this.confirm).click()
    }

    async check1() {
        return await this.driver.findElement(this.checkiflogin).getText()
    }
}

module.exports = mainpage