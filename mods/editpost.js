import fs from 'fs';
export function editTitle(body) {
    try {
        const doc = {
            postTitle: body.postTitle,
            postPhotoUrl: body.postPhotoUrl,
            postDescription: body.postDescription,
            id: Number(body.id),
            tegs: isMas(body.tegs),
            yearCreat: body.yearCreat,
            genre: isMas(body.genre)
        };
        function isMas(mas) {
            try {
                if (typeof (mas) == String('string')) {
                    if (mas == '') {
                        return []
                    }
                    let isObdj = mas.split(',')
                    return isObdj
                }
                else if (typeof (mas) == String('object')) {
                    return mas
                }
            } catch (err) {
                console.log('Ошибка перезаписи', err);
            }
        }


        const text = JSON.parse(fs.readFileSync('./basa/basejson.json', 'utf8'));
        let copy = Object.assign([], text);
        copy.titles.map((num, index) => {
            if (num.id === doc.id) {
                copy.titles.splice(index, 1, doc)
            }
        })
        fs.writeFileSync('./basa/basejson.json', JSON.stringify(text));
        return text;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}