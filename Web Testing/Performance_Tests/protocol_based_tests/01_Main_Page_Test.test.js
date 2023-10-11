import http from 'k6/http'
import {Trend} from 'k6/metrics'
import {sleep, check, group} from 'k6'
import {headers} from '../headers.js'

import mainchunks from '../data_test_login/mainchunks.js'
import fontlist from '../data_test_login/fontcheck.js'
import mainimage from '../data_test_login/mainpageimage.js'
import statics from '../data_test_login/statics.js'

const durasi = new Trend('main_page_duration', true)

export default function login() {

    group('Main Page', () => {

        let chunks = mainchunks()
        let mainfont = fontlist()
        let gambar = mainimage()
        let statika = statics()


        let response = http.batch([
            ['GET', 'https://itemku.com', headers],
            ['GET', 'https://itemku.com/macket-me-alition-doe-a-not-bed-To-most-affraine', headers],
            ...mainfont,
            ...chunks,
            ...gambar,
            ...statika,
            ['GET', 'https://api-gateway.itemku.com/v1/config', headers],
            ['GET', 'https://itemku.com/~partytown/partytown.js?v=0.7.6', headers],
            ['GET', 'https://itemku.com/manifest.json', headers]
        ])
    
        for(const res of response){
            durasi.add(res.timings.duration)
            check(res, {
                'status 200': r => r.status === 200,
            })
        }


    })

   
}