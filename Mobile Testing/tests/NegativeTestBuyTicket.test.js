const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const beli = require('../pageobjects/buy')
const loguin = require('../pageobjects/login')

describe('Negative Test for buying ticket', async() => {
    before(async() => {
        driver = await basis()
        open = new buka(driver)
        login = new loguin(driver)
        buy = new beli(driver)
        await driver.$('//*[@text="Lewati"]').waitForExist({timeout:15000})
        await open.skip()
        await driver.pause(2000)
        if(await driver.$('//*[@text="🎬 Hi, Apa Sih Genre Film yang Kamu Banget?"]').isExisting() == true){
            await login.openprofile()
            await driver.pause(1000)
        }
       else {
        await driver.pause(1000)
       }
    })


    after(async() => {
        await driver.deleteSession()
    })

    it('Membeli tiket tanpa login akan redirect ke halaman login', async() => {
        await driver.touchAction([
            { action: 'press', x: 348, y: 886 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 406 },
            'release'
        ])
        await driver.touchAction([
            { action: 'press', x: 628, y: 628 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 333, y: 628 },
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
        await driver.$('id=id.tix.android:id/toolbar_title').waitForExist()
        const check = await login.getlabelform()
        expect(check).to.equal('Masuk ke TIX ID')

    })

    it('Tidak dapat membeli tiket di waktu yang telah lewat', async()=> {
        await login.input('85669387656','testing12345')
        await driver.pause(1000)
        await login.submitinput()
        await driver.pause(1000)
        await driver.back()
        await buy.today()
        await driver.pause(2000)
        const check = await buy.jamtoday()
        expect(check).to.equal(false)
    })

})
