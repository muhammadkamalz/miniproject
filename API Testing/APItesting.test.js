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
                        image: {type: 'string'},
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
    it.skip('Test to get a single user data', async() => {
        const res = await request.get('user/880')
        expect(res.statusCode).to.equal(200)
        expect(res.body).have.jsonSchema(skema)
    })

    it.only('Test to get all users data ', async() => {
        const res = await request.get('users')
        expect (res.statusCode).to.equal(200)
        expect (res.body).to.have.jsonSchema(skema)
    })

    it.skip('Test to input a new user data', async() => {
        const data = {
            name : 'Gojo Satoru',
            age : '27',
            email :'gojosatoru@gmail.com',
            image :'https://example.com/joker.png'
        }
        const res = await request.post('user/create').send(data)
        expect(res.statusCode).to.equal(200)
        expect(res._body.completed).to.deep.equal(data.completed)
    })

    it.skip('Update inputted user data', async() => {
        const data = {
            name :'Geto Suguru',
            age : '28',
            email : 'getosuguru@yahoo.com',
            image : 'https://example.com/geto.png'
        }
        const res = await request.put('user/edit/879').send(data)
        expect(res.statusCode).to.equal(200)
        expect(res._body.completed).to.deep.equal(data.completed)
    })

    it.skip('Delete a new inputted user data', async() => {
        const res = await request.delete('user/delete/881')
        expect(res.statusCode).to.equal(200)
    })
}) 