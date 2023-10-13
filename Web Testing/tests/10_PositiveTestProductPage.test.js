const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const topap = require('../page_objects/topup')
const cekout = require('../page_objects/checkout')
const caret = require('../page_objects/cart')
const base = require('../utils/bootdriver')

describe('Positive Test Halaman Produk',async() => {
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        topup = new topap(driver)
        checkout = new cekout(driver)
        cart = new caret(driver)
        await login.open()
        await driver.wait(until.elementLocated(By.id('check-icon')),10000).click()
        await login.bukahalamanlogin()
        await driver.sleep(3000)
        await login.input('migosag692@hapincy.com', 'kamal123*')
        await driver.sleep(2000)
        await login.submit()
        await driver.sleep(10000)
        await login.open()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="false"]/div/div/div/div[1]')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//p[contains(text(), "Azur Lane")]')))
        await driver.executeScript('window.scrollBy(0, 600);')
        await topup.openhsr()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="space-y-4 px-6"]')),10000)
    })
    after(async() => {
        await driver.close()
    })
    afterEach( async() =>{
        await driver.sleep(3000)
    })

    it('Dapat menambahkan 1 item', async() => {
        await topup.tambahproduk()
        const check = await topup.cekjumlah()
        expect(check).to.equal('2')
    })

    it('Dapat mengurangi item', async() => {
        await topup.kurangiproduk()
        const check = await topup.cekjumlah()
        expect(check).to.equal('1')
    })

    it('Button ter-Disabled saat item hanya berjumlah 1 /Tidak bisa mengurangi item kurang dari 1', async() => {
        const check = await topup.cekjumlah()
        const check2 = await topup.cekinfokurangiproduk()
        expect(check).to.equal('1')
        expect(check2).to.equal('true')
    })

    it('Dapat menambahkan item ke troli', async() => {
        await topup.input('801309396', 'Asia')
        await topup.add()
        await driver.sleep(3000)
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex flex-col justify-center")]/div//span')), 5000).getText()
        expect(check).to.exist.and.to.equal('Produk berhasil ditambahkan ke Troli.')
    })

    it('Item terdapat di troli', async() => {
        await cart.open1()
        await driver.sleep(2000)
        await cart.opencart()
        await driver.sleep(2000)
        await cart.open1()
        const check1 = await cart.check1()
        const check2 = await cart.check2()
        const check3 = await cart.check3()
        expect(check1).to.equal(true)
        expect(check2).to.equal('60 Oneiric Shard')
        expect(check3).to.equal('1')
    })

    it('Menghapus item dari troli', async() => {
        await driver.wait(until.elementLocated(By.xpath('//div[contains(text(), "Hapus")]')), 10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex pt-8")]/button[2]')),10000).click()
        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class,"w-full text-center text-xl")]')),10000)
        const check = await cart.check4()
        expect(check).to.equal('Wah, troli kamu kosong')
    })

    it('Dapat membeli langsung', async() => {
        await driver.navigate().back()
        await driver.sleep(2000)
        await topup.instantadd()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex flex-col w-8/12")]')),10000).isDisplayed()
        await driver.sleep(2000)
        const check2 = await checkout.checker1()
        const check3 = await checkout.checker2()
        const check4 = await checkout.checker3()
        expect(check).to.equal(true)
        expect(check2).to.equal('60 Oneiric Shard')
        expect(check3).to.equal('801309396')
        expect(check4).to.equal('Asia')
    })

})