const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const cari = require('../pageobjects/search')
const loguin = require('../pageobjects/login')


describe('Negative Testing untuk search bar', async() => {
    before(async() => {
        driver = await basis()
        open = new buka(driver)
        search = new cari(driver)
        login = new loguin(driver)
    })

    before(async() => {
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

    it('Tidak Dapat melakukan search tanpa menginput', async() => {
        await search.clickbar()
        await driver.pause(1000)
        await search.inputsearch('')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        const check = await search.none()
        expect(check).to.equal(true)
    })


    it('Tidak menemukan hasil apabila menginput judul film yang tidak ada', async() => {
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('Selama cinta ini masih berjalan')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/container_no_result_search_movie').waitForExist({timeout: 4000})
        const check = await search.errmsg1()
        expect(check).to.exist.and.to.include('tidak ada hasil pencarian')
    })

    it('Terjadi error saat menginput kalimat & simbol asal di kolom search', async() => {
        await search.kosong()
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('asdasdads!@#$%')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/ll_error').waitForExist({timeout: 4000})
        const check = await search.errmsg2()
        expect(check).to.exist.and.to.include('terjadi kesalahan')
    })

    
    it('Tidak Dapat melakukan search bioskop tanpa menginput', async() => {
        await search.bioskop()
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        const check = await search.headerhistory()
        expect(check).to.equal(true)
    })


    it('Tidak Menemukan hasil apabila menginput nama bioskop yang tidak ada', async() => {
        await search.clickbar()
        await search.inputsearch('Jalan Kenangan')
        await driver.execute('mobile: performEditorAction', { action: 'search' });
        await driver.$('id=id.tix.android:id/container_no_result_search_cinema').waitForExist()
        const check = await search.errmsg1()
        expect(check).to.exist.and.to.include('tidak ada hasil pencarian')
    })

    
    it('Terjadi error saat menginput kalimat & simbol asal di kolom search bioskop', async() => {
        await search.kosong()
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('asdasdads!@#$%')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/ll_error').waitForExist({timeout: 4000})
        const check = await search.errmsg2()
        expect(check).to.exist.and.to.include('terjadi kesalahan')
    })

    it("Tidak Dapat melakukan search actor tanpa menginput", async() => {
        await search.tokoh()
        await search.inputsearch('')
        await driver.execute('mobile: performEditorAction', { action: 'search' });
        const check = await search.headerhistory()
        expect(check).to.equal(true)
    })

    
    it('Tidak Menemukan hasil apabila menginput nama yang bukan aktor', async() => {
        await search.clickbar()
        await search.inputsearch('Ariel Noah')
        await driver.execute('mobile: performEditorAction', { action: 'search' });
        await driver.$('id=id.tix.android:id/container_no_result_search_people').waitForExist()
        const check = await search.errmsg1()
        expect(check).to.exist.and.to.include('tidak ada hasil pencarian')
    })

    it('Terjadi error saat menginput kalimat & simbol asal di kolom search tokoh', async() => {
        await search.kosong()
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('asdasdads!@#$%')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/ll_error').waitForExist({timeout: 4000})
        const check = await search.errmsg2()
        expect(check).to.exist.and.to.include('terjadi kesalahan')
    })

    
})