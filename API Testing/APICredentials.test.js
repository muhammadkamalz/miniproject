const request = require('supertest')('https://apingweb.com/api/')
const {expect} = require('chai')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2Y5MzEwNDc5ODAzZmJmYTg1NmU4ZTdkYzhiYjIxMjE2YjVhMzUwZjI1MmNmZGE4ZDI5NjFkM2I4NGI0YWMzMDIyOTAzMmI5NTRkOGY0OTgiLCJpYXQiOjE2OTY3MTE0MzUuMjYyNDcxLCJuYmYiOjE2OTY3MTE0MzUuMjYyNDc0LCJleHAiOjE3MjgzMzM4MzUuMjU4NjQ5LCJzdWIiOiIxNDk1Iiwic2NvcGVzIjpbXX0.xAzTSYV1y98-E8bltJEmgIc0mVJSSTkFzgHnLCpIMgJKy_OI_zNW9Vphp4mzveUjF3mwXKzVKCzzhpCGrgxmpJtyblRshh69WYU-w-VDnTRpddWyO7wjlVvAndlgsDM2xefU94AHcYSPlRXYEaYf3orUT3jro94a6hvIvA3fdvFNbCTvKLM1ODUmbfdywl0jfhvLXkEvWOhHKYHw4Py_IbmYOA92uJuOEZQ6_lG2ZplZYFfPoNUZdZzhvy-dZleCYlQEOZ717Y1zAF7yyYfLIBmtiYpulWSQ-Xf48IkxTP1c1ldE1GGonOOb5uBXT8ysreOAj4XjdEL7zPmSLjwENo5u4C6YRqWTRqaaShcCUDL4rvO3Jy6ZGytCTJFuRmPkqifARPLlV3lHE5QQ4BuyS6IiPEdRcwOQ16-Cbx5n2h3eHpFvQMCXF7sZry_0MOz6JyCL_OWU-ydJcjV8r3ckA9o9kSX5i0zC-3AdhlOcQp6GJuPVbhH4lsamFCgEdyTBlgLiLReuHaYwhlkDagL5xl3GQ2ynLv-rVoIef5fzv4QYI43hIoVzurIvyPPl2ho92OWbuNK_p3lvMiYeqVV47vM_e7bYg2lSDLXfvXgOJiRv4otJahQTCRQaTrk-l46WoJbC4-DUyI_RFRIVdY-IOfxixLqzKKbESswkTZTxMD0'
//ingat untuk mengganti token setiap kali melakukan login
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

    it.skip('Dapat melakukan fitur ubah password', async() => {
        const data = {
            password:'grayson1234',
            password_confirmation:'grayson1234',
            email:'markedgrayson@gmail.com',
            token:'4u8MmilyocdSOaEB6lB4ULim69irOZW6tqIFPn1SYfmlh2DYSZUal2Q5WiGKtKleK_YZB3QJAKqy1qcgTS827w91lYGHULXqlebcUy0OUkGC0FcWEP6jFCvvmR0eU'
        }

        const res = await request
        .post('reset-password')
        .send(data)
        .expect(200)
        expect(res._body.success).to.equal(true)
        console.log(res.body)
    }) //fail

    it.skip('Dapat mengambil data artikel', async() => {

        const res = await request
        .get('articles')
        .set('Authorization', 'Bearer '+ token)
        expect(res.statusCode).to.equal(200)
        console.log(res._body)
        //success
        //token berganti secara berkala
    })

    it.skip('Dapat mengambil 1 artikel', async() => {
        const res = await request
        //.get('article/2') //hasilnya no result
        .get('article/3173')
        .auth(token, {type:'bearer'})
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
        .auth(token, {type:'bearer'})
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
        .auth(token, {type:'bearer'})
        .expect(200)
        expect(res.body.message).to.equal('Article has been updated')
        console.log(res.body)
    })//success

    it.skip('Berhasil menghapus data artikel', async() => {
        const res= await request
        .delete('article/delete/3171')
        .auth(token, {type:'bearer'})
        .expect(200)
        expect(res.body.success).to.equal(true)
        console.log(res.body)
    })//success, hanya bisa menghapus data yang diinput oleh user_id yang sama
    //id data yang telah diinput : 3172, 3173
})
