import http from 'k6/http'
import {group , check} from 'k6'

export default function get_withoutlogin() {


    group('Get all user data', () => {
        const res = http.get('https://apingweb.com/api/users')
        check(res, {
            'res code must be 200': (r) => r.status === 200
        })
    })
    group('Get a single user data', () => {
       const res = http.get('https://apingweb.com/api/user/891')
       check(res, {
        'res code must be 200': (r) => r.status === 200
    })
    })
}