const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const beli = require('../pageobjects/buy')
const loguin = require('../pageobjects/login')

describe('Positive Test for buying ticket', async() => {
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
            await login.openloginpage()
            await driver.$('id=id.tix.android:id/tv_label').waitForExist()
        }
       else {
            await login.openloginpage()
            await driver.$('id=id.tix.android:id/tv_label').waitForExist()
       }
       await login.input('85669387656','testing12345')
       await driver.pause(1000)
       await login.submitinput()
       await driver.pause(1000)
       await login.back()
       await driver.pause(2000)
       await login.back()
       await driver.pause(1000)
       await login.back()
       if(await driver.$('//*[@text="🎬 Hi, Apa Sih Genre Film yang Kamu Banget?"]').isExisting() == true){
        await login.openprofile()
        await driver.pause(1000)
        await driver.$('id=id.tix.android:id/iv_banner_promo').waitForExist()
    }
   else if (await driver.$('id=id.tix.android:id/com_braze_inappmessage_modal_imageview').isExisting() == true){
        await login.closepopup()
        await driver.$('id=id.tix.android:id/iv_banner_promo').waitForExist()
   }
   else {
    await driver.$('id=id.tix.android:id/iv_banner_promo').waitForExist()
   }
    })


    after(async() => {
        await driver.deleteSession()
    })

    it('Dapat Membeli tiket yang tersedia', async() => {
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
        const check = await buy.checkticket()
        expect(check).to.equal(true)

    })

    it('Dapat memilih kursi untuk dibeli diboskop', async()=> {
        await buy.tiket()
        await driver.$('id=id.tix.android:id/tv_screen_title').waitForExist()
        await buy.seat()
        await driver.pause(2000)
        const check = await driver.$('id=id.tix.android:id/tv_selected_seat').isExisting()
        expect(check).to.equal(true)
    })

    it('Dapat melanjutkan checkout untuk beli tiket', async() => {
       await buy.buyticket()
       await driver.$('id.tix.android:id/rl_container_top').waitForExist()
       await driver.touchAction([
        { action: 'press', x: 348, y: 886 },
        {action: 'wait', ms:1000},
        { action: 'moveTo', x: 348, y: 206 },
        'release'
    ])
     const check = await buy.checkerbayar()
     expect(check).to.equal(true)
    })

    it('Dapat membatalkan pesanann',async() => {
        await login.back()
        await driver.$('id=id.tix.android:id/parentPanel').waitForExist()
        await buy.batal()
        await driver.pause(2000)
        const check = await buy.checkcancel()
        expect(check).to.equal(true)
    })

})