import {headers} from '../headers.js'

export default function gambar() {
    const image = [
        ['GET', 'https://itemku.com/favicon.ico', headers],
        ['GET', 'https://itemku.com/manifest.json', headers],
        ['GET', 'https://itemku.com/static/itemku-icon.png', headers],
        ['GET', 'https://files.itemku.com/logo/itemku/pwa-icon-144.png', headers],
        ['GET', 'https://files.itemku.com/language/id.json', headers],
        ['GET', 'https://imgop.itemku.com/?url=https%3A%2F%2Ffiles.itemku.com%2Flogo%2Fitemku%2Fitemku-favicon.png&w=64&q=75', headers],
    ]
    return image
}