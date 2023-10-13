const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const loguin = require('../pageobjects/login')

describe('Negative Test for Login Process', async() => {
    before(async() => {
        driver = await basis()
        open = new buka(driver)
        login = new loguin(driver)
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

    it('Button Login tidak dapat diklik apabila data nomor hp & password tidak diisi', async() => {
       const check = await login.checksubmit()
       expect(check).to.not.equal(true)
    })

    it('Button Login tidak dapat diklik apabila hanya data password yang diisi', async() => {
        await login.input('', '123456789')
        const check = await login.checksubmit()
        expect(check).to.not.equal(true)        
    })

    it('Button Login tidak dapat diklik apabila hanya data nomor hp yang diisi', async() => {
        await login.input('85669387656', '')
        const check = await login.checksubmit()
        expect(check).to.not.equal(true)
    })

    it('Tidak dapat login apabila Password salah', async() => {
        await login.input('85669387656', '123456789')
        await login.submitinput()
        await driver.pause(2000)
        const check = await login.err()
        expect(check).to.exist.and.to.equal('Nomor handphone atau password salah')
    })

    it('Tidak dapat login apabila Nomor Handphone salah', async() => {
        await login.closerrmsg()
        await driver.pause(1000)
        await login.input('82210008558', 'testing12345')
        await login.submitinput()
        await driver.$('id=id.tix.android:id/tv_message').waitForExist({timeout : 10000})
        const check = await login.err()
        expect(check).to.exist.and.to.equal('Nomor handphone atau password salah')
    })


})