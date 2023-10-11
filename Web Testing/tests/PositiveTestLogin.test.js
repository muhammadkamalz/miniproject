const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const base = require('../utils/bootdriver')

describe('Positive Test for Login Process',async() => {
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
        await login.input('migosag692@hapincy.com', 'kamal123*')
        await driver.sleep(2000)
        await login.submit()
        await driver.sleep(10000)
        await login.open()
        const check = await login.check1()
        expect(check).to.exist.and.to.equal('kemal')
    })

    it('Logout', async() => {
        await login.bukaprofil()
        await driver.sleep(1000)
        await login.buttonbiru()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="relative"][4]/button')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Log Out")]/parent::*/parent::*')),10000).click()
        await driver.sleep(1000)
        const check = await login.check2()
        expect(check).to.exist.and.to.equal('Login Dengan Email')
    })

})