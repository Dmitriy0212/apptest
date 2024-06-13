import { addData } from './home.js';
export function getYear() {
    try {
        let mas = []
        let allTegs = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            if (allTegs.length === 0) {
                allTegs.push(item.yearCreat)
            }
            else {
                    for (let i = 0; i < allTegs.length;) {
                        if (allTegs[i] === item.yearCreat) {
                            break
                        }
                        if (i == allTegs.length-1) {
                            allTegs.push(item.yearCreat)
                        }
                        i++
                    }
            }
        })
        allTegs.sort(function (a, b) {
            return a - b;
        })
        return allTegs
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};