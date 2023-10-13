const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const loguin = require('../page_objects/login')
const topap = require('../page_objects/topup')
const base = require('../utils/bootdriver')

describe('Negative Test Halaman Produk',async() => {
    before(async() => {
        driver = await base()
        login = new loguin(driver)
        topup = new topap(driver)
        await login.open()
        await driver.sleep(3000)
        await driver.wait(until.elementLocated(By.id('check-icon')),10000).click()
    })
    beforeEach(async() => {
        await driver.sleep(3000)
    })
    after(async() => {
        await driver.close()
    })
    afterEach( async() =>{
        await driver.sleep(3000)
    })

    it('Tidak bisa menambahkan ke cart tanpa login', async() => {
        await topup.open()
        await driver.wait(until.elementLocated(By.xpath('//p[contains(text(), "Azur Lane")]')))
        await driver.executeScript('window.scrollBy(0, 600);')
        await topup.openhsr()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 10000).click()
        await driver.sleep(2000)
        await topup.input('801309396', 'Asia')
        await topup.add()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex leading-5")]/span')),10000).getText()
        expect(check).to.equal('Yuk login terlebih dahulu.')
        //benerin assertion
    })

    it('Tidak bisa menambahkan ke cart tanpa memasukkan data', async() => {
        await driver.navigate().back()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 10000).click()
        await driver.sleep(2000)
        await topup.add()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "w-full z-20")]/p[2][contains(text(), "Masukkan User ID")]')),10000).getText()
        const check2 = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "w-full z-20")]/p[2][contains(text(), "Masukkan Server")]')),10000).getText()
        expect(check).to.equal('Masukkan User ID Honkai: Star Rail kamu dengan benar')
        expect(check2).to.equal('Masukkan Server Honkai: Star Rail kamu dengan benar')
    })

    it('Tidak bisa menambahkan ke cart tanpa memasukkan data server', async() => {
        await topup.input('801309396', '')
        await driver.sleep(2000)
        await topup.add()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "w-full z-20")]/p[2][contains(text(), "Masukkan Server")]')),10000).getText()
        expect(check).to.equal('Masukkan Server Honkai: Star Rail kamu dengan benar')
    })

    it('Tidak bisa menambahkan ke cart tanpa memasukkan data uid', async() => {
        await driver.navigate().refresh()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="space-y-5 py-4"]/div[1]//input[contains(@placeholder, "Contoh: 801311343")]')))
        await topup.input('', 'Asia')
        await driver.sleep(2000)
        await topup.add()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "w-full z-20")]/p[2][contains(text(), "Masukkan User ID")]')),10000).getText()
        expect(check).to.equal('Masukkan User ID Honkai: Star Rail kamu dengan benar')
    })

    it('Tidak bisa menambahkan item lebih dari stok yang tersedia',async() => {
        while(await topup.cekjumlah() < await topup.cekstok()){
            await topup.tambahproduk()
        }
        const check = await topup.cekinfotambahproduk()
        expect(check).to.equal('true')
    })

    it ('Tidak bisa membeli item secara langsung tanpa login', async() => {
        await topup.instantadd()
        const check = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "flex leading-5")]/span')),10000).getText()
        expect(check).to.equal('Yuk login terlebih dahulu.')
    })

})