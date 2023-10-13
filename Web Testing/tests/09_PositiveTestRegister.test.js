const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const registrar = require('../page_objects/register')
const base = require('../utils/bootdriver')

describe('Positive Test Halaman Register',async() => {
    before(async() => {
        driver = await base()
        register = new registrar(driver)
    })
    after(async() => {
        await driver.close()
    })
    afterEach( async() =>{
        await driver.sleep(3000)
    })

    it('Register', async() => {
        await register.openregister()
        await driver.sleep(3000)
        await register.inputdata('fefenip443@ibtrades.com', 'testing12345')
        await driver.sleep(2000)
        await register.confirm()
        await driver.sleep(10000)
        const check = await driver.wait(until.elementLocated(By.xpath('//div[@class="px-4"]/p')),20000).getText()
        expect(check).to.equal('Link verifikasi telah dikirimkan ke email')
    })



})