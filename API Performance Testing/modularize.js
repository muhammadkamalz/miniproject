import thresholds from './config/thresholds.js'

import smoke_test from './config/smoke_test_scenario.js'
import load_test from './config/load_test_scenario.js'
//importing scenarios

import getToken from './utils/getlogintoken.js'

import basiclogintest from './groups/get_withbasiclogin.js'
import nologintest from './groups/get_withoutlogin.js'
import tokenlogintest from './groups/get_withtokenlogin.js'

//importing tests
const scenario_list = {
    smoke: smoke_test,
    average: load_test,
}

export const options = {
    thresholds,
    scenarios : {
        used_scenario : scenario_list[__ENV.Test] || smoke_test
    },
}

export function setup() {
    return getToken()
}
export default function test(token) {
    basiclogintest()
    nologintest()
    tokenlogintest(token)
}