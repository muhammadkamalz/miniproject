const request = require('supertest')('https://apingweb.com/api/')
const {expect} = require('chai')
const chai = require('chai')
const schema = require('chai-json-schema')
chai.use(schema)

const skema = 
    {
        type: 'object',
        required: [
            'success',
            'message',
            'status',
            'data'
        ],
        properties: {
            success: { 'type': 'boolean'},
            message: { 'type': 'string'},
            status: {'type': 'integer'},
            data: {
                type: 'array',
                items:{
                    type: 'object',
                    required: [
                        'user_id',
                        'name',
                        'age',
                        'email',
                        'image',
                        'date_created'
                    ],
                    properties: {
                        user_id: { type: 'string'},
                        name: {type: 'string'},
                        age: {type: 'string'},
                        email: {type: 'string'},
                        image: {type: ['string', 'null']},
                        date_created: {type: 'string'}
                    }
                }
    
            }
        }
    
}


// async function tes() {
// const resingle = await request.get('user/878')
// const res = await request.get('users')
// console.log(resingle.body)
// }

// tes()

describe("Users API on APIngweb.com", async() => {
    it('Test to get a single user data', async() => {
        const res = await request.get('user/880')
        console.log(res.body)
        expect(res.statusCode).to.equal(200)
        expect(res.body).have.jsonSchema(skema)
    })

    it.only('Negative Test to get a single data', async() => {
        const res = await request.get('use')
        expect(res.statusCode).to.equal(404)
        expect(res.body).to.not.have.jsonSchema(skema)
    })

    it('Test to get all users data ', async() => {
        const res = await request.get('users')
        console.log(res.body)
        expect (res.statusCode).to.equal(200)
        expect (res.body).to.have.jsonSchema(skema)
    })

    it('Test to input a new user data', async() => {
        const data = {
            name : 'Gojo Satoru',
            age : '27',
            email :'gojosatoru@gmail.com',
            image :'https://example.com/joker.png'
        }
        const res = await request.post('user/create').send(data)
        expect(res.statusCode).to.equal(200)
    })

    

    it('Update inputted user data', async() => {
        const data = {
            name :'Ukiyo Ace',
            age : '23',
            email : 'ukiyoeisu@yahoo.com',
            image : 'https://example.com/geats.png'
        }
        const res = await request.put('user/edit/916').send(data)
        expect(res.statusCode).to.equal(200)
    })

    it('Delete a new inputted user data', async() => {
        const res = await request.delete('user/delete/917')
        expect(res.statusCode).to.equal(200)
    })
}) 