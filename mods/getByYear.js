import { addData } from './home.js';

export function getByYearThis(year) {
    try {
        const postYear = year;
        let mas = []
        let allTegs = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            if (postYear == item.yearCreat) {
                allTegs.push(item)
            }
        })
        return allTegs
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};