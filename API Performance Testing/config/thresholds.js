const thresholds = {

        iterations : ['count > 10'],
        http_req_failed : ['rate<0.5'],
        http_req_duration :['p(90) < 500', 'p(95) < 600']

}

export default thresholds