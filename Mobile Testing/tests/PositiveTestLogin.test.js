const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const loguin = require('../pageobjects/login')

describe('Menguji Fungsi logout tix.id', async() => {
    before(async() => {
        driver = await basis()
        open = new buka(driver)
        login = new loguin(driver)
    })

    before(async() => {
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
    })
    after(async() => {
        await driver.deleteSession()
    })

    it('Dapat melakukuan Login',async() => {
       await login.input('85669387656','testing12345')
       await driver.pause(1000)
       await login.submitinput()
       await driver.pause(2000)
       await login.back()
       await driver.pause(2000)
       await login.back()
       const wait = await driver.$('id=id.tix.android:id/rl_account_container')
       await wait.waitForExist()
       const check = await login.checklogin()
       expect(check).to.exist.and.to.equal('+62 85669387656')
    })

    it('Dapat melakukan Logout', async() => {
        await login.opensetting()
        await driver.pause(2000)
        await driver.$('//*[@text="Akun"]').waitForExist({timeout: 10000})
        await driver.touchAction([
            { action: 'press', x: 348, y: 886 },
            {action: 'wait', ms:1000},
            { action: 'moveTo', x: 348, y: 586 },
            'release'
        ])
        await login.logout()
        await driver.$('id=id.tix.android:id/parentPanel').waitForExist({timeout: 10000})
        await login.confirmlogout()
        await driver.$('id=id.tix.android:id/iv_banner_promo').waitForExist({timeout: 10000})
        const check = await login.checklogout()
        expect(check).to.exist.and.to.equal('MASUK/DAFTAR')


    })

})