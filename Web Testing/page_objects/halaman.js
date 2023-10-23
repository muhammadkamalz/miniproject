const {WebDriver} = require('selenium-webdriver')

class halaman {
    constructor (driver){
        this.driver = driver
    }

    async buka(path = '/') {
        this.driver.get('https://itemku.com' + path) //to open itemku.com
    }


}

module.exports = halaman