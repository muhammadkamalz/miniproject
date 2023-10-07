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


describe('Authentication Testing', async() => {
    it('Should be able to authenticate and get all users data', async() => {
        const res = await request
        .get('auth/users')
        .auth('admin', '12345')
        .expect(200)
        expect(res.body).to.have.jsonSchema(skema)
    })

    it('Should be able to authenticate and get a single user data', async() => {
        const res = await request
        .get('auth/user/463')
        .auth('admin', '12345')
        .expect(200)
        expect(res.body).to.have.jsonSchema(skema)
    })

    it.skip('Should be able to authenticate and create a new user data', async() => {
        const data = {
            name: 'Siena' ,
            age: '18' ,
            email: 'sienatycoon@yahoo.com' ,
            image: 'https://example.com/siena.png'
        }

        const res = await request
        .post('auth/user/create').send(data)
        .auth('admin', '12345')
        .expect(200)
        expect(res._body.success).to.equal(true)


    })

    it.skip('Should be able to authenticate and update an user data', async() => {
        const newdata = {
            name : 'May',
            age : '19',
            email :'mayfield@gmail.com',
            image : 'https://example.com/batman.png'
        }

        const res = await request
        .put('auth/user/edit/464').send(newdata)
        .auth('admin', '12345')
        .expect(200)
        expect(res._body.success).to.equal(true)
    })

    it.skip('Should be able to authenticate and delete an user data', async() => {
        const res = await request
        .delete('auth/user/delete/471')
        .auth('admin', '12345')
        .expect(200)
        expect(res._body.success).to.equal(true)
    })
})