const request = require('supertest')('https://apingweb.com/api/')
const {expect} = require('chai')

const toke = require('./getToken.js')
describe('Testing Credentials on accessing API', async() => {
    it.skip('Registrasi kedalam API terlebih dahulu', async() => {
        const data = {
            name:'Mark Grayson' ,
            email:'markedgrayson@gmail.com' ,
            phone:'1234567890' ,
            password:'grayson1234' ,
            password_confirmation:'grayson1234' 
        }
        const res = await request
        .post('register')
        .set('Content-Type', 'application/json')
        .send(data)
        
        expect(res.statusCode).to.equal(200)
        console.log(res.body)
        
        //success
    })
    it.skip('Login kedalam APIngweb', async() => {
        const data = {
            email :'markedgrayson@gmail.com',
            password:'grayson1234'
        }
        const res = await request
        .post('login')
        .send(data)
        .expect(200)
        
        console.log(res.body)
    })//success

    it.skip('Dapat melakukan fitur lupa password', async() => {
        const data = {
            email: 'markedgrayson@gmail.com',
            link: 'https://contoh.com'
        }

        const res = await request
        .post('forgot-password')
        .send(data)
        .expect(200)
        expect(res._body.success).to.equal(true)
        console.log(res.body)
    }) //success

    it.skip('Dapat melakukan fitur ubah password', async(token) => {
        const data = {
            password:'grayson1234',
            password_confirmation:'grayson1234',
            email:'markedgrayson@gmail.com',
            token: await toke()
        }

        const res = await request
        .post('reset-password')
        .send(data)
        .expect(200)
        expect(res._body.success).to.equal(true)
        console.log(res.body)
    }) //fail

    it.only('Dapat mengambil data artikel', async() => {
        const token = await toke()
        const res = await request
        .get('articles')
        .set('Authorization', 'Bearer '+ token)
        expect(res.statusCode).to.equal(200)
        console.log(res._body)
        //success
        //token berganti secara berkala
    })

    it.only('Dapat mengambil 1 artikel', async() => {
        const res = await request
        //.get('article/2') //hasilnya no result
        .get('article/3173')
        .auth(await toke(), {type:'bearer'})
        expect(res.statusCode).to.equal(200)
        console.log(res._body)
        //success, harus mengambil dari id yang terbaru, tidak bisa mengambil id yang lama
    })

    it.skip('Dapat menginput data',async() => {
        const data = {
            title : 'Harry Potter',
            body : 'Fushiguro is a normal highschooler who got dragged into the world of jujutsu because he eats the finger of the king of curses ryomen sukuna',
            picture : 'https://example.com/itadori.png'
        }
        const res = await request
        .post('article/create')
        .send(data)
        .auth(await toke(), {type:'bearer'})
        .expect(200)
        console.log(res.body)
    })//success

    it.skip('Dapat mengedit data artikel yang ada', async() => {
        const data = {
            title : 'Jujutsu Kaisen',
            body : 'Itadori is a normal highschooler who got dragged into the world of jujutsu because he eats the finger of the king of curses ryomen sukuna',
            picture : 'https://example.com/itadori.png'
        }
        const res = await request
        .put('article/edit/3172')
        .send(data)
        .auth(await toke(), {type:'bearer'})
        .expect(200)
        expect(res.body.message).to.equal('Article has been updated')
        console.log(res.body)
    })//success

    it.skip('Berhasil menghapus data artikel', async() => {
        const res= await request
        .delete('article/delete/3171')
        .auth(await toke(), {type:'bearer'})
        .expect(200)
        expect(res.body.success).to.equal(true)
        console.log(res.body)
    })//success, hanya bisa menghapus data yang diinput oleh user_id yang sama
    //id data yang telah diinput : 3172, 3173
})
