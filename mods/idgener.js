import fs from 'fs';
export function rundomId() {
    const generId = Math.floor((Math.random() * (101 - 11) + 11) * 20000)
    const getId = JSON.parse(fs.readFileSync('./basa/basejson.json', 'utf8'));
    if (getId.titles == undefined) {
        getId.titles = []
    }
    else {
        getId.titles.map((num) => {
            if (Number(num.id) == Number(generId)) {
                return rundomId()
            }
        })
    }
    return generId
}
