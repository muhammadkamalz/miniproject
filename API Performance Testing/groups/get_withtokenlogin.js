import http from 'k6/http'
import {group, check} from 'k6'
import headers from '../utils/tokenlogin.js'

export default function tokenlogin(token) {
    group('Berhasil mengambil data artikel', () => {
       const res = http.get('https://apingweb.com/api/articles', headers(token))
       check(res, {
        'res code must be 200': (r) => r.status === 200
    })
    })

    group('Berhasil mengambil salah satu data artikel', () => {
       const res = http.get('https://apingweb.com/api/article/1', headers(token))
       check(res, {
        'res code must be 200': (r) => r.status === 200
    })
    })
}