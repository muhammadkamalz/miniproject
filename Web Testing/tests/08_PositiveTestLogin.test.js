const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const base = require('../utils/bootdriver')
const {chaiImage} = require('chai-image')
const chai = require('chai')
chai.use(chaiImage)

describe.only('Positive Test Halaman Login',async() => {
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        await login.bukahalamanlogin()
        await driver.sleep(3000)
    })
    after(async() => {
        await driver.close()
    })
    afterEach( async() =>{
        await driver.sleep(3000)
    })

    it('Login', async() => {
        await driver.sleep(3000)
        await login.input('migosag692@hapincy.com', 'kamal123*')
        await driver.sleep(3000)
        await login.submit()
        await driver.sleep(10000)
        await login.open()
        await driver.sleep(2000)
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex items-center justify-between pt-3")]/div[4]/button'))).click()
        await driver.sleep(5000)
        await driver.wait(until.elementLocated(By.xpath('//div[@id="check-icon"]'))).click()
        await driver.sleep(5000)
        const screenshot = await login.takesschecklogin()
        const check = await login.checksschecklogin()
        const checkname = await login.checklogin()
        expect(checkname).to.equal('kemal')
        expect(check).to.matchImage(screenshot)
    })

    it('Logout', async() => {
        await driver.wait(until.elementLocated(By.xpath('//div[@class="relative"][4]/button')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Log Out")]/parent::*/parent::*')),10000).click()
        await driver.sleep(5000)
        const screenshot = await login.takesschecklogout()
        const check = await login.checksschecklogout()
        const check2 = await login.check2()
        expect(check).to.matchImage(screenshot)
        expect(check2).to.equal('Login Dengan Email')
    })

})