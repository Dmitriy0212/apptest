import { addData } from './home.js';

export function getByTeg(teg) {
    try {
        const postTeg = teg;
        let mas = []
        let allTegs = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            item.tegs.map((itemTeg) => {
                if(postTeg==itemTeg){
                    allTegs.push(item)
                }
            })
        })
        return allTegs
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};