import fs from 'fs';
export function authUser(gmail) {
    try {
        const data = JSON.parse(fs.readFileSync('./basa/basejsonUser.json', 'utf8')).users
        let copy = Object.assign([], data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].mail === gmail) {
                return { status: 200, id: data[i].id };
            }
        }
        return { status: 500 };
    } catch (err) {
        console.log('Ошибка создания поста', err);
        return err
    }
}