const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const loguin = require('../pageobjects/login')
const bought = require('../pageobjects/buy')

describe('Testing End to End', async() => {
    before(async() => {
        driver = await basis()
        open = new buka(driver)
        login = new loguin(driver)
        buy = new bought(driver)
    })

    before(async() => {
        await open.skip()
        await open.allow()
    })
    after(async() => {
        await driver.deleteSession()
    })
    it('Check if main page is opened or not', async() => {
        const check = await open.checker1()
        const tunggu = await driver.$('//*[@text="🎬 Hi, Apa Sih Genre Film yang Kamu Banget?"]').waitForExist()
        if(tunggu == true){
            await login.openprofile()
            expect(check).to.exist.and.to.equal('Sedang Tayang')
        }
       else {
        expect(check).to.exist.and.to.equal('Sedang Tayang')
       }
    })

    it('Check if login page can be opened', async() => {
        await login.openloginpage()
        const tunggu = await driver.$('id=id.tix.android:id/tv_label')
        const check = await login.getlabelhp()
        await tunggu.waitForExist()
        expect(check).to.exist.and.to.equal('NOMOR HANDPHONE')
    })

    it('Should be able to login using given phone number & password', async() => {
        await login.input('85669387656','testing12345')
        await login.back()
        await driver.pause(2000)
        await login.back()
        const wait = await driver.$('id=id.tix.android:id/rl_account_container')
        await wait.waitForExist()
        const check = await login.checklogin()
        expect(check).to.exist.and.to.equal('+62 85669387656')

    })

    it('Should be able to order a ticket for a movie', async() => {
        await login.back()
            await driver.pause(2000)
            await driver.touchAction([
                { action: 'press', x: 348, y: 886 },
                {action: 'wait', ms:1000},
                { action: 'moveTo', x: 348, y: 406 },
                'release'
            ])
            await buy.beli()
            await driver.pause(2000)
            await driver.touchAction([
                { action: 'press', x: 348, y: 886 },
                {action: 'wait', ms:1000},
                { action: 'moveTo', x: 348, y: 406 },
                'release'
            ])
            await buy.day()
            await driver.pause(2000)
            await buy.jam()
            await driver.pause(2000)
            await buy.tiket()
            await driver.pause(2000)
            await buy.seat()
            await driver.pause(2000)
            await buy.buyticket()
            await driver.pause(2000)
            const check1 = await buy.checkfilm()
            const check2 = await buy.seatposition()
            expect(check1).to.exist.and.to.equal('DI AMBANG KEMATIAN')
            expect(check2).to.exist.and.to.equal('F4')
            await driver.touchAction([
                { action: 'press', x: 348, y: 886 },
                {action: 'wait', ms:1000},
                { action: 'moveTo', x: 348, y: 206 },
                'release'
            ])
            await driver.pause(2000)
            const check3 = await buy.bayar()
            expect(check3).to.exist.and.to.equal('BAYAR SEKARANG')
        
    })
})