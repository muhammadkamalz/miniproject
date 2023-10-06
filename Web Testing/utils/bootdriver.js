const {Builder, Browser} = require('selenium-webdriver')
const {Options} = require('selenium-webdriver/chrome')

async function bukahalaman() {
    const options = new Options()
    options.addArguments("start-maximized")
    const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build()

    // const originalWindowSize = await driver.manage().window().getSize();

    // // await driver.manage().window().setRect(originalWindowSize)
    // await driver.manage().window().maximize() 
    return driver
}

module.exports = bukahalaman