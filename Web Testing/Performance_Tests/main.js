
import {browser} from 'k6/experimental/browser'


import main_page from './protocol_based_tests/01_Main_Page_Test.test.js'
import login_page from './protocol_based_tests/02_Login_Page_Test.test.js'
import login_email_page from './protocol_based_tests/03_Login_Email_Page_Test.test.js'
import topup_page from './protocol_based_tests/04_Topup_Page_Test.test.js'

import browser_main_page from './browser_based_tests/01_Main_Page_Test.test.js'
import browser_login_page from './browser_based_tests/02_Login_Page_Test.test.js'
import browser_login_email_page from './browser_based_tests/03_Login_Email_Page_Test.test.js'
import browser_list_game_for_topup from './browser_based_tests/04_List_Available_Game_For_Topup_Page.test.js'
import browser_topup from './browser_based_tests/05_Topup_HSR_Page.test.js'
import browser_list_game_for_akun from './browser_based_tests/06_List_Available_Game_For_Buying_Account_Page.test.js'
import browser_topup_product from './browser_based_tests/07_Fastbuy_Product_Page.test.js'

import thresholds from './config/thresholds.js'

export const options = {
    thresholds,
    scenarios :{
        protocolBased: {
            exec : 'protocolBasedTest',
            executor :'constant-vus',
            vus:1,
            duration : '50s'
        },
        browserBased :{
            exec: 'browserBasedTest',
            executor : 'shared-iterations',
            vus: 1,
            options: {
                browser:{
                    type:'chromium'
                }
            }
        }
    }
}
export async function browserBasedTest(){
    const page = browser.newPage()

    try {
        await browser_main_page(page)
        await browser_login_page(page)
        await browser_login_email_page(page)
        await browser_list_game_for_topup(page)
        await browser_topup(page)
        await browser_list_game_for_akun(page)
        await browser_topup_product(page)
    }
    finally {
        page.close()
    }
}

export function protocolBasedTest() 
{   
    main_page()
    login_page()
    login_email_page()
    topup_page()

}