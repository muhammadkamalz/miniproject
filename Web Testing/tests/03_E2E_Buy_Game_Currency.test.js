const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const uang = require('../page_objects/money')
const caret = require('../page_objects/cart')
const cekout = require('../page_objects/checkout')
const base = require('../utils/bootdriver')

describe('E2E testing for buying ingame currency for a game ', async() =>{
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        money = new uang(driver)
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

    it('Select a game to buy its currency & put into cart', async() => {
        await money.bukatabcurr()
        await driver.sleep(2000)
        await driver.wait(until.elementLocated(By.xpath('//p[contains(text(), "Albion Online")]')), 10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "grid grid-flow")]/a[2]')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "w-full grid")]')),10000)
        await driver.sleep(2000)
        await money.input('BellAqua')
        await driver.sleep(2000)
        await money.add()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex flex-col justify-center")]/div//span')), 5000).getText()
        expect(check).to.exist.and.to.equal('Produk berhasil ditambahkan ke Troli.')
    })


    it('Cart page', async() => {
        await cart.open1()
        await driver.sleep(2000)
        await cart.opencart()
        await driver.sleep(2000)
        const check1 = await cart.check1()
        expect(check1).to.exist.and.to.equal(true)
    })

    it('Checkout', async() => {
        await cart.open1()
        await driver.sleep(2000)
        await cart.continue()
        await driver.sleep(3000)
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

    it('Remove item from cart', async() => {
        await cart.open1()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Lihat Troli")]')),10000).click()
        await driver.sleep(2000)
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Hapus")]')), 10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex pt-8")]/button[2]')),10000).click()
        await driver.sleep(2000)
        const check = await cart.check2()
        expect(check).to.equal('Wah, troli kamu kosong')
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

