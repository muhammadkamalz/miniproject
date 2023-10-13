const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const cari = require('../pageobjects/search')
const loguin = require('../pageobjects/login')


describe.only('Positive Testing untuk search bar', async() => {
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

    it('Dapat melakukan search film', async() => {
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('Jurassic')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/affiliate_result').waitForExist({timeout: 4000})
        const check = await search.hasil()
        expect(check).to.include('JURASSIC')
    })

    it('Menampilkan History pencarian film', async() => {
        await search.kosong()
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        expect(check).to.equal('Jurassic')
    })

    it('Menampilkan History kedua pencarian film', async() => {
        await search.clickbar()
        await driver.$('id=id.tix.android:id/cl_input').waitForExist()
        await search.inputsearch('Spirited Away')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await search.kosong()
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        const check2 = await search.riwayat2()
        expect(check).to.equal('Spirited Away')
        expect(check2).to.equal('Jurassic')
    })

    it('Dapat melakukan search bioskop', async() => {
        await search.bioskop()
        await search.inputsearch('CGV')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/rv_search_cinema').waitForExist()
        const check = await search.hasilbioskop()
        expect(check).to.include('CGV')
    })

    it('Menampilkan History pencarian bioskop', async() => {
        await search.kosong()
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        expect(check).to.equal('CGV')
    })

    it('Menampilkan History kedua pencarian bioskop', async() => {
        await search.bioskop()
        await search.inputsearch('21')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await search.kosong()
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        const check2 = await search.riwayat2()
        expect(check).to.equal('21')
        expect(check2).to.equal('CGV')
    })


    it("Dapat melakukan search actor", async() => {
        await search.tokoh()
        await search.inputsearch('Robert Downey Jr')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/rv_search_people').waitForExist()
        const check = await search.hasiltokoh()
        expect(check).to.include('Robert Downey')
    })

    it('Menampilkan History pencarian actor', async() => {
        await search.kosong()
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        expect(check).to.equal('Robert Downey Jr')
    })

    it('Menampilkan History kedua pencarian actor', async() => {
        await search.tokoh()
        await search.inputsearch('Masahiro Inoue')
        await driver.execute('mobile: performEditorAction', { action: 'search' })
        await search.kosong()
        await driver.$('id=id.tix.android:id/tv_title_search').waitForExist()
        const check = await search.riwayat()
        const check2 = await search.riwayat2()
        expect(check).to.equal('Masahiro Inoue')
        expect(check2).to.equal('Robert Downey Jr')
    })

})