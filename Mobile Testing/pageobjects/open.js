const{remote} = require('webdriverio')

class open {
    constructor(driver) {
        this.driver = driver
    }

    get skipbutton() {return driver.$('//*[@text="Lewati"]')}
    get tvcity() {return driver.$('id=id.tix.android:id/tv_header_title')}
    get allow1() {return driver.$('//*[@text="WHILE USING THE APP"]')}
    get title() {return driver.$('id=id.tix.android:id/toolbar_title')}
    
    async skip(){
        await this.skipbutton.click()
    }

    async allow() {
        await this.allow1.click()
    }

    async checker1() {
        return await this.tvcity.getText()
    }

    async judul(){
        return await this.title.getText()
    }
}

module.exports = open