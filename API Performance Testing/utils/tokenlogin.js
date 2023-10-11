export default function headers(token){
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}