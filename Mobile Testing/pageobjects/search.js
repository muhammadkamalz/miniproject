class search {
    constructor(driver) {
        this.driver = driver
    }

    get searchbar() {return driver.$('id=id.tix.android:id/et_input')}
    get searchresult() {return driver.$('//android.widget.FrameLayout[1]/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[1]/android.widget.TextView')}
    get pilihbioskop() {return driver.$('~Bioskop')}
    get resultbioskop() {return driver.$('//android.view.ViewGroup[1]/android.widget.LinearLayout[2]/android.widget.TextView[1]')}
    get pilihtokoh() {return driver.$('~Tokoh')}
    get resultokoh() {return driver.$('id=id.tix.android:id/tv_name_people')}
    get kosongkan() {return driver.$('id=id.tix.android:id/iv_clear')}

    
    get err() {return driver.$('id=id.tix.android:id/ll_error')}
    get err1() {return driver.$('id=id.tix.android:id/tv_no_result_title')}
    get err2() {return driver.$('id=id.tix.android:id/tv_error_message')}
    get headhistory() {return driver.$('id=id.tix.android:id/tv_title_search')}
    get history1() {return driver.$('id=id.tix.android:id/tv_search_first')}
    get history2()  {return driver.$('id=id.tix.android:id/tv_search_second')}
    


    async clickbar() {
        await this.searchbar.click()
    }

    async inputsearch(judul) {
        await this.searchbar.setValue(judul)
    }

    async hasil() {
        return await this.searchresult.getText()
    }

    async bioskop() {
        await this.pilihbioskop.click()
    }

    async tokoh() {
        await this.pilihtokoh.click()
    }

    async hasiltokoh() {
        return await this.resultokoh.getText()
    }

    async hasilbioskop() {
        return await this.resultbioskop.getText()
    }

    async kosong() {
        await this.kosongkan.click()
    }

    async errmsg1() {
        return await this.err1.getText()
    }

    async errmsg2() {
        return await this.err2.getText()
    }

    async none(){
        return await this.err.isDisplayed()
    }

    async headerhistory() {
        return await this.headhistory.isDisplayed()
    }

    async riwayat() {
        return await this.history1.getText()
    }

    async riwayat2() {
        return await this.history2.getText()
    }
}

module.exports = search