import http from 'k6/http'
import {Trend, Counter} from 'k6/metrics'
import {sleep, check, group} from 'k6'
import {headers} from '../headers.js'

import mainchunks from '../protocol_data/mainchunks.js'
import fontlist from '../protocol_data/fontcheck.js'
import gambar from '../protocol_data/topuppageimage.js'
import statics from '../protocol_data/statics.js'

const durasi = new Trend('topup_page_duration', true)

export default function login() {

    group('Topup Page', () => {

        let chunks = mainchunks()
        let font = fontlist()
        let image = gambar()
        let statika = statics()


        let response = http.batch([
            ['GET', 'https://itemku.com/c/tipe-produk/top-up-game', headers],
            ['GET', 'https://itemku.com/macket-me-alition-doe-a-not-bed-To-most-affraine', headers],
            ['GET', 'https://s.itemku.com/c2c/_next/static/chunks/33167.dac9f43517ac5828.js', headers],
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