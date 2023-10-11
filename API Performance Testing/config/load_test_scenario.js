const load_test = { //use average data for load testing
    executor :'ramping-vus',
    stages : [
        {duration: '10s', target: 15},
        {duration: '30s', target:40},
        {duration: '1m', target: 100},
        {duration: '3m', target: 100},
        {duration: '1m' , target:0}
    ],
}

export default load_test