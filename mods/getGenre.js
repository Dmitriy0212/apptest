import { addData } from './home.js';
export function getGenre() {
    try {
        let mas = []
        let allGenre = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            if (allGenre.length === 0) {
                item.genre.map((item) => { allGenre.push(item) })
            }
            else {
                item.genre.map((item) => {
                    for (let i = 0; i < allGenre.length;) {
                        if (allGenre[i] === item) {
                            break
                        }
                        if (i == allGenre.length - 1) {
                            allGenre.push(item)
                        }
                        i++
                    }
                })
            }
        })

        allGenre.sort(function (a, b) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        })

        return allGenre
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};