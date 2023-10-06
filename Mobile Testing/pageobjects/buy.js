class buyticket {
    constructor(driver){
        this.driver = driver
    }
    get tombolbuy() {return driver.$('id=id.tix.android:id/rel_buy_ticket_home')}
    get belitiket() {return driver.$('id=id.tix.android:id/ll_buy_ticket')}
    get tombolday() {return driver.$('//android.widget.RadioGroup/android.widget.RadioButton[2]')}
    get tomboljam() {return driver.$('//android.widget.RelativeLayout[contains(@resource-id, "id.tix.android:id/ll_container_time_view")][2]')}
    get tomboljam2() {return driver.$('//androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[2]')}
    get kursi() {return driver.$('//android.widget.LinearLayout[6]/android.widget.LinearLayout[4]/android.widget.TextView')}
    get send() {return driver.$('id=id.tix.android:id/btn_send')}
    get tiketterbeli() {return driver.$('id=id.tix.android:id/tv_seats')}
    get infofilm() {return driver.$('id=id.tix.android:id/tv_movie_title')}
    get tombolcheckout() {return driver.$('id=id.tix.android:id/btn_pay')}

    async beli() {
        await this.tombolbuy.click()
    }

    async day() {
        await this.tombolday.click()
    }

    async jam() {
        await this.tomboljam2.click()
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
    async checkfilm() {
        return await this.infofilm.getText()
    }

    async seatposition() {
        return await this.tiketterbeli.getText()
    }

    async bayar() {
        return await this.tombolcheckout.getText()
    }
}

module.exports = buyticket