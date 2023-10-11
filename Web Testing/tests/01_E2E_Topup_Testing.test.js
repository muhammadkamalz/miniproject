const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const topap = require('../page_objects/topup')
const caret = require('../page_objects/cart')
const cekout = require('../page_objects/checkout')
const base = require('../utils/bootdriver')

describe('Topup end 2 end testing', async() =>{
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        topup = new topap(driver)
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
        await driver.sleep(3000)
        const check = await login.check1()
        expect(check).to.exist.and.to.equal('kemal')
    })

    it('Select item to buy & Fill Data', async() => {
        await topup.open()
        await driver.wait(until.elementLocated(By.xpath('//p[contains(text(), "Azur Lane")]')))
        await driver.executeScript('window.scrollBy(0, 600);')
        await topup.openhsr()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 10000).click()
        await driver.sleep(2000)
        await topup.input('801309396', 'Asia')
        await topup.add()
        await driver.sleep(3000)
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
        const check2 = await checkout.checker2()
        const check3 = await checkout.checker3()
        const check4 = await checkout.checker4()
        const check6 = await checkout.checker6()
        expect(check2).to.exist.and.to.equal('801309396')
        expect(check3).to.exist.and.to.equal('Asia')
        expect(check4).to.exist.and.to.equal('DANA Linkage')
        expect(check6).to.equal(true)
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

