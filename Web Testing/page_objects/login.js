const halaman = require('./halaman')
const{By} = require('selenium-webdriver')
const {writeFileSync, readFileSync } = require('fs')

const result = 'screenshots1/hasil/login.png'
const expected = 'screenshots1/expect/login.png'
const resultlogout = 'screenshots1/hasil/logout.png'
const expectedlogout = 'screenshots1/expect/logout.png'

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
    //input

    checkiflogin = By.xpath('//button[@class="flex"]/div/p')
    emailerr = By.xpath('//form/div[1]/div/p[2]')
    passworderr = By.xpath('//form/div[2]/div/p[2]')
    //checkers

    //profile
    profil = By.xpath('//div[contains(@class, "flex items-center justify-between pt-3")]/div[4]/button')
    profilname = By.xpath('//div[contains(@class,"flex items-center")]/h2')
    ceklogout = By.xpath('//div[contains(text(), "Login dengan Email")]')
    bluebutton = By.id('check-icon')

    async openemail() {
        await this.bukaemail()
    }
    async open() {
        await this.buka()
    }

    async bukahalamanlogin() {
        await this.buka('/login/email')
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

    async buttonbiru() {
        await this.driver.findElement(this.bluebutton).click()
    }
    async submit() {
        await this.driver.findElement(this.confirm).click()
    }

    async bukaprofil() {
        await this.driver.findElement(this.profil).click()
    }

    async check1() {
        return await this.driver.findElement(this.checkiflogin).getText()
    }

    async check2() {
        return await this.driver.findElement(this.ceklogout).getText()
    }

    async checklogin() {
        return await this.driver.findElement(this.profilname).getText()
    }

    async errmsgmail() {
        return await this.driver.findElement(this.emailerr).getText()
    }

    async errmsgpass () {
        return await this.driver.findElement(this.passworderr).getText()
    }

    async takesschecklogin() {
        const fotograph = await this.driver.takeScreenshot()
        const sintesis =  Buffer.from(fotograph, 'base64')                          
        writeFileSync(result, sintesis)                    
        return sintesis
    }

    async takesschecklogout() {
        const take = await this.driver.takeScreenshot()
        const takeresult =  Buffer.from(take, 'base64')                          
        writeFileSync(resultlogout, takeresult)                    
        return takeresult
    }

    async checksschecklogin() {
        const checker =  readFileSync(expected)
        return checker
    }

    async checksschecklogout() {
        const checker =  readFileSync(expectedlogout)
        return checker
    }
    //rc-imageselect-payload
}

module.exports = mainpage