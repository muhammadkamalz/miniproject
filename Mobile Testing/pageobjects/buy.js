class buyticket {
    constructor(driver){
        this.driver = driver
    }
    get tombolbuy() {return driver.$('id=id.tix.android:id/rel_buy_ticket_home')}
    get belitiket() {return driver.$('id=id.tix.android:id/ll_buy_ticket')}
    get tombolday() {return driver.$('//android.widget.RadioGroup/android.widget.RadioButton[2]')}
    //get day 2 dari tiket bioskop

    get tomboljam() {return driver.$('//androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[2]//android.view.ViewGroup[2]')}
    get tomboljam2() {return driver.$('//androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]//android.view.ViewGroup[2]')}

    //get jam yang tersedia
    get kursi() {return driver.$('//android.widget.LinearLayout[6]/android.widget.LinearLayout[6]/android.widget.TextView')}
    //get kursi F4 
    get send() {return driver.$('id=id.tix.android:id/btn_send')}
    //
    get tiketterbeli() {return driver.$('id=id.tix.android:id/tv_seats')}

    get tombolcheckout() {return driver.$('id=id.tix.android:id/btn_pay')}
    //checker
    get batalkan() {return driver.$('id=android:id/button1')}
    //cancel order
    get checkselecthari() {return driver.$('id=id.tix.android:id/ll_day_selection_container')}
    //check if canceled
    async beli() {
        await this.tombolbuy.click()
    }

    async day() {
        await this.tombolday.click()
    }

    async jam() { //untuk memilih jam di bioskop pertama
        await this.tomboljam2.click()
    }

    async jam2() { //untuk memilih jam di bioskop kedua
        await this.tomboljam.click()
    }

    async tiket() {
        await this.belitiket.click()
    }
    async seat() {
        await this.kursi.click()
    }
    async buyticket(){
        await this.send.click()
    }

    //checker

    async checkcancel() {
        return await this.checkselecthari.isExisting()
    }
    async seatposition() {
        return await this.tiketterbeli.getText()
    }

    async bayar() {
        return await this.tombolcheckout.getText()
    }

    async batal() {
        await this.batalkan.click()
    }
}

module.exports = buyticket