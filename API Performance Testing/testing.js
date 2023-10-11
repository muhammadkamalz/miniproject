import http from 'k6/http'
import {check, group} from 'k6'
import datalogin from './utils/datalogin.js'

export default function teslogin() {
    group('Able to authenticate and get all data', () => {
        const url = 'https://apingweb.com/api/auth/users'
        const res = http.get(url, datalogin())
        check(res, {
            'Rescode should be 200' : (rescheck) => rescheck.status === 200
        })
    })
}