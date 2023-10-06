class login {
    constructor(driver) {
        this.driver = driver
    }

    get buttonlogin() {return driver.$('id=id.tix.android:id/btn_view_home_login')}
    get labelhp() {return driver.$('id=id.tix.android:id/tv_label')}
    get nohp() {return driver.$('id=id.tix.android:id/et_input')}
    get pw() {return driver.$('id=id.tix.android:id/edt_password')}
    get submit() {return driver.$('id=id.tix.android:id/btn_login')}
    get errormsg() {return driver.$('id=id.tix.android:id/tv_message')}
    
    get infohp() {return driver.$('id=id.tix.android:id/tv_account_phone_no')}
    get profilebutton() {return driver.$('id=id.tix.android:id/iv_account')}
    get mainshowcase() {return driver.$('//*[@resource-id="id.tix.android:id/ev_topup_dana"]')}
    get tombolkembali() {return driver.$('~Kembali ke atas')}
    get closepopup1() {return driver.$('~untuk menutup')}


    async closepopup11(){
        await this.closepopup1.click()
    }

    async openloginpage(){
        await this.buttonlogin.click()
    }

    async getlabelhp() {
        return await this.labelhp.getText()
    }

    async input(hp, password) {
        await this.nohp.setValue(hp)
        await this.pw.setValue(password)
        await this.submit.click()
    }

    async openprofile() {
        await this.profilebutton.click()
    }

    async openshowcase() {
        await this.mainshowcase.click()
    }

    async back() {
        await this.tombolkembali.click()
    }

    async err () { 
        return await this.errormsg.getText()
    }

    async checklogin() {
        return await this.infohp.getText()
    }

}

module.exports = login