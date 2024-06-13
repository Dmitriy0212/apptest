import { addData } from './home.js';
export function getOnePost(id) {
    try {
        const postId = id;
        let mas = []
        let post = null
        addData().map((item) => { mas.push(item) })
        mas.map((item) => {
            if (Number(item.id) === Number(postId)) {
                return post = item
            }
        })
        return post
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};