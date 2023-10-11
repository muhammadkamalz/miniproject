import http from 'k6/http'

export default function (){
    const url = 'https://apingweb.com/api/login'

    const data = JSON.stringify({
        email: 'markedgrayson@gmail.com',
        password: 'grayson1234'
    }
)
    const headers = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const login = http.post(url,data,headers)
    return login.json().token
}