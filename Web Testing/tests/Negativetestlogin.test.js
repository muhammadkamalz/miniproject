const {expect} = require('chai')
const {By, until} = require('selenium-webdriver')
const base = require('../utils/bootdriver')
const loguin = require('../page_objects/login')

describe('Negative Test', async () => {
    before(async() => {
        driver = await base()
        login = new loguin(driver)
    })
    beforeEach(async() => {
        await login.bukahalamanlogin()
        await driver.sleep(3000)
    })
    after(async() => {
        await driver.close()
    })
    it('Gagal Login karena tidak menginput password', async() => {
        await login.input('migosag692@hapincy.com', '')
        await login.submit()
        const check = await login.errmsgpass()
        expect(check).to.exist.and.to.equal('Password minimal 8 karakter')
    })

    it('Gagal login karena tidak menginput email', async() => {
        await login.input('','12345678')
        await login.submit()
        const check = await login.errmsgmail()
        expect(check).to.exist.and.to.equal('Silahkan masukan email terlebih dahulu')
    })

    it('Gagal login karena tidak menginputkan data', async() => {
        await login.input('','')
        await login.submit()
        const check = await login.errmsgmail()
        expect(check).to.exist.and.to.equal('Silahkan masukan email terlebih dahulu')
    })
})