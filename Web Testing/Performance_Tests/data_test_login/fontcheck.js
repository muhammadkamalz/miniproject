import {headers} from '../headers.js'

export default function font() {
    const font = [
        ['GET', 'https://files.itemku.com/fonts/Prototype.ttf', headers],
        ['GET', 'https://files.itemku.com/fonts/badaboom.ttf', headers],
        ['GET', 'https://files.itemku.com/fonts/back-issues.ttf', headers],
        ['GET', 'https://files.itemku.com/fonts/Montreal-Regular.ttf', headers],
        ['GET', 'https://files.itemku.com/fonts/Montreal-Bold.ttf', headers],
    ]
    return font
}