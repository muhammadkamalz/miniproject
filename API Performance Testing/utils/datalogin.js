import encoding from 'k6/encoding'

export default function headers() {
    return {
        headers: {
            'Authorization': 'basic '+ encoding.b64encode("admin:12345")
        }
    }
}