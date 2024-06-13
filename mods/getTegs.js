import { addData } from './home.js';
export function getTegs() {
    try {
        let mas = []
        let allTegs = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            if (allTegs.length === 0) {
                item.tegs.map((item) => { allTegs.push(item) })
            }
            else {
                item.tegs.map((item) => {
                    for (let i = 0; i < allTegs.length;) {
                        if (allTegs[i] === item) {
                            break
                        }
                        if (i == allTegs.length - 1) {
                            allTegs.push(item)
                        }
                        i++
                    }
                })
            }
        })

        allTegs.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        })

        return allTegs
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};