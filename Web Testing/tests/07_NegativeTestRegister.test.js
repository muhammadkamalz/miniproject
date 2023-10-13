const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const registrar = require('../page_objects/register')
const base = require('../utils/bootdriver')

describe('Negative Test Halaman Register',async() => {
    before(async() => {
        driver = await base()
        register = new registrar(driver)
        await register.openregister()
        await driver.sleep(2000)
        await driver.wait(until.elementLocated(By.xpath('//div[@class="px-4"]')),10000)
    })
    after(async() => {
        await driver.close()
    })
    afterEach( async() =>{
        await driver.navigate().refresh()
        await driver.sleep(2000)
        await driver.wait(until.elementLocated(By.xpath('//div[@class="px-4"]')),10000)
    })

    it('Tidak dapat register tanpa menginput data', async() => {
        await register.inputdata('', '')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errmail()
        const check2 = await register.errpw()
        expect(check).to.equal('Format email salah.')
        expect(check2).to.equal('kolom_ini_masih_kosong')
    })

    it('Tidak dapat register tanpa menginput email', async() => {
        await register.inputdata('', 'testing12345')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errmail()
        expect(check).to.equal('Format email salah.')
    })

    it('Tidak dapat register tanpa menginput password', async() => {
        await register.inputdata('yabam48653@locawin.com', '')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errpw()
        expect(check).to.equal('kolom_ini_masih_kosong')
    })

    it('Tidak dapat register karena password tidak memenuhi persyaratan minimal', async() => {
        await register.inputdata('yabam48653@locawin.com','1')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errpw()
        expect(check).to.include('Minimal 8 karakter.')
    })

    it('Tidak dapat register karena format email salah', async() => {
        await register.inputdata('yabam@yabam','testing12345')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errmail()
        expect(check).to.equal('Format email salah.')
    })

    it('Tidak dapat register karena format email salah & password tidak memenuhi persyaratan minimal', async() => {
        await register.inputdata('yabam@yabam','1')
        await driver.sleep(2000)
        await register.confirm()
        const check = await register.errmail()
        const check2 = await register.errpw()
        expect(check).to.equal('Format email salah.')
        expect(check2).to.include('Minimal 8 karakter.')
    })

    it('Tidak dapat register karena email telah terdaftar', async() => {
        await register.inputdata('migosag692@hapincy.com','kamal123*')
        await driver.sleep(2000)
        await register.confirm()
        const check = await driver.wait(until.elementLocated(By.id('client-snackbar')),10000).getText()
        expect(check).to.equal('Alamat email sudah terdaftar.')
    })


})