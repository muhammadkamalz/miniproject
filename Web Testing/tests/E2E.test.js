const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/mainpage')
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
        const check = await login.check1()
        expect(check).to.exist.and.to.equal('kemal')
    })

    it('Select item to buy & Fill Data', async() => {
        await topup.open()
        await driver.wait(until.elementLocated(By.xpath('//p[contains(text(), "Azur Lane")]')))
        await driver.executeScript('window.scrollBy(0, 600);')
        await topup.openhsr()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 10000).click()
        await driver.sleep(5000)
        await topup.input('01309396', 'sia')
        await topup.add()
        await driver.sleep(3000)
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex flex-col justify-center")]/div//span')), 5000).getText()
        expect(check).to.exist.and.to.equal('Produk berhasil ditambahkan ke Troli.')
    })



    it('Cart page', async() => {
        await cart.open1()
        await driver.sleep(5000)
        await cart.opencart()
        await driver.sleep(5000)
        const check1 = await cart.check1()
        expect(check1).to.exist.and.to.equal('60 Oneiric Shard')
    })

    it.skip('Checkout', async() => {
        await cart.continue()
        await driver.sleep(5000)
        await checkout.selectpayment()
        await driver.sleep(5000)
        await checkout.selectdana()
        await checkout.confirmpayment()
        await driver.sleep(5000)
        const check2 = await checkout.checker2()
        const check3 = await checkout.checker3()
        const check4 = await checkout.checker4()
        expect(check2).to.exist.and.to.equal('801309396')
        expect(check3).to.exist.and.to.equal('Asia')
        expect(check4).to.exist.and.to.equal('DANA Linkage')

    })
})  

