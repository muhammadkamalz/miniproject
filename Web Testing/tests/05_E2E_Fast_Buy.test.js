const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const cepat = require('../page_objects/fastbuy')
const caret = require('../page_objects/cart')
const cekout = require('../page_objects/checkout')
const base = require('../utils/bootdriver')

describe('E2E Test to fast buy something ', async() =>{
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        fast = new cepat(driver)
        cart = new caret(driver)
        checkout = new cekout(driver)
        await login.open()
    })
    beforeEach(async() => {
        await driver.sleep(5000)
    })
    after(async() => {
        await driver.close()
    })

    it('Login', async() => {
        await login.loginpage()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="px-4"]/div/button')), 10000).click()
        await driver.sleep(2000)
        await login.input('migosag692@hapincy.com', 'kamal123*')
        await driver.sleep(2000)
        await login.submit()
        await driver.sleep(10000)
        await login.open()
        await driver.sleep(2000)
        const check = await driver.wait(until.elementLocated(By.xpath('//button[@class="flex"]/div/p')), 10000).getText()
        expect(check).to.exist.and.to.equal('kemal')
    })

    it('Select a game to instantly buy a product related to the game', async() => {
        await fast.bukatabgenshin()
        await driver.wait(until.elementLocated(By.id('2191904')), 10000).click()
        await driver.sleep(3000)
        await fast.input('802200638','Asia')
        await driver.sleep(2000)
        await fast.submit()
        await driver.sleep(2000)
        const check = await fast.checker1()
        expect(check).to.equal('Blessing of the Welkin Moon')
    })


    it('Checkout', async() => {
        await checkout.selectpayment()
        await driver.sleep(3000)
        await checkout.selectdana()
        await checkout.confirmpayment()
        await driver.sleep(3000)
        const check = await checkout.checker4()
        const check2 = await checkout.checker6()
        expect(check).to.exist.and.to.equal('DANA Linkage')
        expect(check2).to.equal(true)
    })

    it('Cancel Order', async() => {
        await checkout.batalkan()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Keluar")]')), 10000).click()
        await driver.sleep(2000)
        const check = await checkout.checker5()
        expect(check).to.equal(true)
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

