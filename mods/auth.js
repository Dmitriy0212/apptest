import fs from 'fs';
export function authUser(gmail) {
    try {
        const data = JSON.parse(fs.readFileSync('./basa/basejsonUser.json', 'utf8')).users
        for (let i = 0; i < data.length; i++) {
            if (data[i].mail === gmail) {
                return 200;
            }
        }
        return 501
    } catch (err) {
        console.log('Ошибка создания поста', err);
        return err
    }
}