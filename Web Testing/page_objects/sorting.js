const halaman = require('./halaman')
const{By} = require('selenium-webdriver')

class sort extends halaman{
    
    tombolsort = By.xpath('//div[contains(@class, "space-x-4 flex")]/div/div')
    termurah = By.xpath('//div[contains(@class, "space-x-4 flex")]//div[contains(@class, "cursor-pointer")][2]')
    populer = By.xpath('//div[contains(@class, "space-x-4 flex")]//div[contains(@class, "cursor-pointer")][3]')
    terlaris = By.xpath('//div[contains(@class, "space-x-4 flex")]//div[contains(@class, "cursor-pointer")][5]')
    termahal = By.xpath('//div[contains(@class, "space-x-4 flex")]//div[contains(@class, "cursor-pointer")][7]')
    //tipe sort

    tenminute = By.xpath('//div[@class="px-4"]/div[@class="py-2"][3]//div[contains(@id, "radio")]')
    tampil = By.xpath('//div[contains(@class, "p-4 flex")]/button')
    //sorting garansi pengiriman

    label1 = By.xpath('//div[contains(@class, "grid-flow-row")]//a[1]//div[contains(@class, "flex flex-row")][2]')
    label2 = By.xpath('//div[contains(@class, "grid-flow-row")]//a[2]//div[contains(@class, "flex flex-row")][2]')

    //data garansi pengiriman

    sortcheckpopuler = By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]//span[contains(@class, "line-clamp-2")]')
    sortcheckharga1 = By.xpath('//div[contains(@class, "grid-flow-row")]//a[5]//div[contains(text(), "terjual")]')
    sortcheckharga2 = By.xpath('//div[contains(@class, "grid-flow-row")]//a[6]//div[contains(text(), "terjual")]')

    sortchecklowestprice1 = By.xpath('//div[@class="grid grid-flow-row gap-4"]/a[1]/div/div/div[contains(@class, "text-persimmon")]')
    sortchecklowestprice2 = By.xpath('//div[@class="grid grid-flow-row gap-4"]//a[2]//div[contains(@class, "text-persimmon")]')

    sortcheckhighestprice1 = By.xpath('//div[@class="grid grid-flow-row gap-4"]//a[9]//div[contains(@class, "text-persimmon")]')
    sortcheckhighestprice2 = By.xpath('//div[@class="grid grid-flow-row gap-4"]//a[10]//div[contains(@class, "text-persimmon")]')
    //sortdata

    async opengenshinpage() {
        await this.buka('/g/genshin-impact/top-up?from=product-type-game-top-up')
    }

    async sSort() {
        await this.driver.findElement(this.tombolsort).click()
    }

    async menit () {
        await this.driver.findElement(this.tenminute).click()
    }

    async sTerlaris() {
        await this.driver.findElement(this.terlaris).click()
    }

    async tampilkan() {
        await this.driver.findElement(this.tampil).click()
    }

    async sPopuler() {
        await this.driver.findElement(this.populer).click()
    }

    async sTermurah() {
        await this.driver.findElement(this.termurah).click()
    }

    async sTermahal() {
        await this.driver.findElement(this.termahal).click()
    }

    async harga1() {
        const harga = await this.driver.findElement(this.sortchecklowestprice1).getText()
        const matcharga = harga.match(/(\d+\.\d+)/)
        const convertharga = matcharga[0]
        return convertharga
    }

    async harga2() {
        const harga = await this.driver.findElement(this.sortchecklowestprice2).getText()
        const matcharga = harga.match(/(\d+\.\d+)/)
        const convertharga = matcharga[0]
        return convertharga
    }

    async harga5() {
        const harga = await this.driver.findElement(this.sortcheckharga1).getText()
        const matcharga = harga.match(/\d+/)
        const convertharga = matcharga[0]
        const conv = parseInt(convertharga)
        console.log(convertharga)
        return conv
    }

    async harga6() {
        const harga = await this.driver.findElement(this.sortcheckharga2).getText()
        const matcharga = harga.match(/\d+/)
        const convertharga = matcharga[0]
        const conv = parseInt(convertharga)
        return conv
    }

    async harga9() {
        const harga = await this.driver.findElement(this.sortcheckhighestprice1).getText()
        const matcharga = harga.match(/(\d+\.\d+)/)
        const convertharga = matcharga[0]
        return convertharga
    }

    async harga10() {
        const harga = await this.driver.findElement(this.sortcheckhighestprice2).getText()
        const matcharga = harga.match(/(\d+\.\d+)/)
        const convertharga = matcharga[0]
        return convertharga
    }

    async garansi1() {
        return await this.driver.findElement(this.label1).getText()
    }

    async garansi2() {
        return await this.driver.findElement(this.label2).getText()
    }
    async checkpopuler() {
        return await this.driver.findElement(this.sortcheckpopuler).getText()
    }
}

module.exports = sort