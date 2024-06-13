import { addData } from './home.js';

export function getByGenreThis(genre) {
    try {
        const postGenre = genre;
        let mas = []
        let allGenre = []
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            item.genre.map((itemGenre) => {
                if(postGenre==itemGenre){
                    allGenre.push(item)
                }
            })
        })
        return allGenre
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};