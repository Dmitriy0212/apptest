import fs from 'fs';
import { rundomId } from './idgener.js';
import { error } from 'console';
export function addTitle(body) {
    let a = rundomId()
    try {
        const text = JSON.parse(fs.readFileSync('./basa/basejson.json', 'utf8'));
        let copy = Object.assign([], text);

        const doc = {
            image: `http://localhost:8080/author/posts/blog/download/img?id=${a}`,
            name: body.name,
            skills: body.skills,
            description: body.description,
            id: a,
            linkc: [
                { tiktok: body.tiktok },
                { instagram: body.instagram },
                { youtube: body.youtube },
                { xsolid: body.xsolid },
                { linkedin: body.linkedin },
                { pinterest: body.pinterest },
                { facebook: body.facebook },
            ]
        };
        fs.rename('./uploads/' + body.image, './uploadsstatik/'+doc.id+'.png', error => {
            if (error) throw error
        })
        if (copy.authors == undefined || copy.authors.length == 0) {
            copy.authors = []
        }
        text.authors.push(doc);
        console.log(copy)
        console.log(text)
        fs.writeFileSync('./basa/basejson.json', JSON.stringify(text));
        return true;
    } catch (error) {
        console.log('Ошибка создания поста', error);
    }
}