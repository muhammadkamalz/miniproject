const {expect} = require('chai')
const{By, until} = require('selenium-webdriver')
const base = require('../utils/bootdriver')
const sorter = require('../page_objects/sorting')

describe('Sorting Test', async() => {
    before(async() => {
        driver = await base()
        sort = new sorter(driver)
    })

    beforeEach(async() => {
        await sort.opengenshinpage()
        await driver.wait(until.elementLocated(By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]')), 40000)
        await sort.sSort()
        await driver.sleep(2000)
    })
    after(async() => {
        await driver.close()
    })

    it('Sort item terlaris', async() => {
        await sort.sTerlaris()
        await driver.sleep(3000)
        await driver.executeScript('window.scrollBy(0, 300);')
        const hrg1 = await sort.harga5()
        const hrg2 = await sort.harga6()
        const check = hrg1 > hrg2
        expect(check).to.equal(true)
    })

    it('Sort Item Populer', async() => {
        await sort.sPopuler()
        await driver.sleep(3000)
        const check = await sort.checkpopuler()
        expect(check).to.exist.and.to.equal('Blessing of the Welkin Moon')
    })

    it('Sort harga termurah', async() => {
        await sort.sTermurah()
        await driver.sleep(3000)
        const hrg1 = await sort.harga1()
        const hrg2 = await sort.harga2()
        const check = hrg1 < hrg2
        expect(check).to.equal(true)
    })

    it('Sort harga termahal', async() => {
        await sort.sTermahal()
        await driver.sleep(3000)
        await driver.executeScript('window.scrollBy(0, 800);')
        await driver.sleep(2000)
        const hrg1 = await sort.harga9()
        const hrg2 = await sort.harga10()
        const check = hrg1 > hrg2
        expect(check).to.equal(true)
    })

    it('Sort item termurah yang memiliki garansi pengiriman dalam 10 menit', async() => {
        await sort.menit()
        await sort.tampilkan()
        await driver.sleep(3000)
        await sort.sSort()
        await driver.sleep(2000)
        await sort.sTermurah()
        await driver.sleep(3000)
        const hrg1 = await sort.harga1()
        const hrg2 = await sort.harga2()
        const check = hrg1 < hrg2
        expect(check).to.equal(true)
        const check2 = await sort.garansi1()
        const check3 = await sort.garansi2()
        expect(check2).to.exist.and.to.equal('10 Menit Kirim')
        expect(check3).to.exist.and.to.equal('10 Menit Kirim')
    })

})
