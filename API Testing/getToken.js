const request = require('supertest')('https://apingweb.com/api/')


async function getoken() {
    const data = {
        email :'markedgrayson@gmail.com',
        password:'grayson1234'
    }
    const res = await request
    .post('login')
    .send(data)
    return res.body.token
}

module.exports = getoken