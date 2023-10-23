const {By} = require('selenium-webdriver')
const halaman = require('./halaman')

class register extends halaman {
    constructor(driver) {
        super(driver)
    }

    email = By.xpath('//input[contains(@placeholder,"contohemail")]')
    password = By.xpath('//input[@type="password"]')
    submit = By.xpath('//div[contains(@class, "mt-6 justify-center")]/button')

    cekemail = By.xpath('//a[contains(text(), "Verifikasi email")]')
    cekregister = By.xpath('//p[@class="mb-14"]/div')

    //checkers

    errmsgmail = By.xpath('//div[@class="mt-6 pb-2"][1]/div/p[2]')
    errmsgpw = By.xpath('//div[@class="mt-6 pb-2"][2]/div/p[2]')

    async openregister(){
        await this.buka('/daftar')
    }


    async inputdata(mail, pw){
        await this.driver.findElement(this.email).sendKeys(mail)
        await this.driver.findElement(this.password).sendKeys(pw)
    }

    async confirm() {
        await this.driver.findElement(this.submit).click()
    }

    async bukaemail() {
        await this.driver.findElement(this.cekemail).click()
    }

    async checker() {
        return this.driver.findElement(this.cekregister).getText()
    }

    async errmail() {
        return this.driver.findElement(this.errmsgmail).getText()
    }

    async errpw() {
        return this.driver.findElement(this.errmsgpw).getText()
    }

}

module.exports = register