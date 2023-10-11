import http from 'k6/http'
import {Trend, Counter} from 'k6/metrics'
import {sleep, check, group} from 'k6'
import {headers} from '../headers.js'

import loginchunks from '../data_test_login/loginchunks.js'
import fontlist from '../data_test_login/fontcheck.js'
import gambar from '../data_test_login/image.js'
import statics from '../data_test_login/statics.js'

const durasi = new Trend('login_email_page_duration', true)

export default function login() {

    group('Login with Email Page', () => {

        let chunks = loginchunks()
        let font = fontlist()
        let image = gambar()
        let statika = statics()


        let response = http.batch([
            ['GET', 'https://itemku.com/login/email', headers],
            ['GET', 'https://itemku.com/macket-me-alition-doe-a-not-bed-To-most-affraine', headers],
            ...font,
            ...chunks,
            ...image,
            ...statika,
            ['GET', 'https://api-gateway.itemku.com/v1/config', headers],
            ['GET', 'https://itemku.com/~partytown/partytown.js?v=0.7.6', headers],
            ['GET', 'https://itemku.com/manifest.json', headers]
        ])
    
        for(const res of response){
            durasi.add(res.timings.duration)
            check(res, {
                'status 200': r => r.status === 200
            })
        }


    })

   
}