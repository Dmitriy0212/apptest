import fs from 'fs';
export function addData() {
    try {
        const data = JSON.parse(fs.readFileSync('./basa/basejson.json', 'utf8')).authors
        return data ;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}