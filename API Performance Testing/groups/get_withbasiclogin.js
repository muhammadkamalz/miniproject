import http from 'k6/http'
import {group, check} from 'k6'
import datalogin from '../utils/datalogin.js'

export default function get_withoutlogin() {
    group('Get all user data while logged in', () => {
        const res = http.get('https://apingweb.com/api/auth/users', datalogin())
        check(res, {
            'res code must be 200': (r) => r.status === 200
        })
})
    group('Get a single user data ', () => {
        const res = http.get('https://apingweb.com/api/auth/user/464', datalogin())
        check(res, {
            'res code must be 200': (r) => r.status === 200
        })
    })
}