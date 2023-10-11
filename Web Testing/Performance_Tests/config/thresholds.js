const thresholds = {
    http_reqs : ['count > 2000'],
    http_req_failed : ['rate < 0.5'],
    http_req_duration : ['p(90) < 2000'],
    browser_web_vital_cls : ['p(75) < 0.25'],
    browser_web_vital_lcp : ['p(75) < 3000']
}

export default thresholds