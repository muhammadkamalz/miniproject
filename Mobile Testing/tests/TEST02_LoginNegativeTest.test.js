const {expect} = require('chai')
const buka = require('../pageobjects/open')
const basis = require('../util/bootdriver')
const loguin = require('../pageobjects/login')

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

})