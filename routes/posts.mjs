import express from 'express'
import db from "../config/db.mjs"

const router = express.Router()

router.get('/posts', async (req, res) => {

    try {

        const posts = await db.query('SELECT * FROM posts_table')

        if (!posts) {
            return res.status(404).send({
                message: "no posts found"
            })
        }

        res.send({
            message: "posts fetched",
            data: posts[0]
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.post('/posts', (req, res) => {

    try {



    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

export default router