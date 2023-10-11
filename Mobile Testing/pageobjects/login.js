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
    get tombolkembali() {return driver.$('~Kembali ke atas')}
    get popupalert() {return driver.$('~untuk menutup')}

    get tombolseting() {return driver.$('id=id.tix.android:id/iv_settings_account')}
    get tombolkeluar() {return driver.$('//*[@text="Keluar"]')}
    get acceptkeluar() {return driver.$('id=android:id/button1')}
    //logout test


    async closepopup(){
        await this.popupalert.click()
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
    }

    async submitinput(){
        await this.submit.click()
    }

    async openprofile() {
        await this.profilebutton.click()
    }

    async opensetting() {
        await this.tombolseting.click()
    }

    async logout() {
        await this.tombolkeluar.click()
    }

    async confirmlogout() {
        await this.acceptkeluar.click()
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

    async checksubmit() {
        return await this.submit.isEnabled()
    }

    async checklogout() {
        return await this.buttonlogin.getText()
    }
}

module.exports = login