const {expect} = require('chai')
const{By} = require('selenium-webdriver')
const loguin = require('../page_objects/mainpage')
const base = require('../utils/bootdriver')

describe.skip('harus bisa buka halaman login', async() => {
    before(async() => {
        driver = await base()
        login = new loguin(driver)
    })


    after(async() => {
        driver.close()
    })

    it('Bisa membuka halaman login', async() => {
        await login.open()
        await driver.sleep(2000)
        await login.loginpage()
        await driver.sleep(1000)
        await login.openloginpage()
        await driver.sleep(1000)
        const check = await login.checkloginform()
        expect(check).to.exist.and.to.equal(true)
    })

    it('Bisa login', async() => {
        await driver.sleep(1000)
        await login.input('migosag692@hapincy.com', 'kamal123*')
        await driver.sleep(3000)
        await login.open()
        await driver.sleep(2000)
        const check = await login.check1()
        expect(check).to.exist.and.to.equal('kemal')
    })


})