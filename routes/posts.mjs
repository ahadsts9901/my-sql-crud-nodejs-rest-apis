import express from 'express'
import db from "../config/db.mjs"
import moment from 'moment'

const router = express.Router()

router.get('/posts', async (req, res) => {

    try {

        const posts = await db.query('SELECT * FROM posts_table ORDER BY id DESC')

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

router.get('/posts/:postId', async (req, res) => {

    const { postId } = req?.params

    if (!postId) {
        return res.status(400).send({
            message: "postId is required"
        })
    }

    try {

        const [post] = await db.query(`SELECT * FROM posts_table WHERE id=?`, [postId])

        if (!post) {
            return res.status(404).send({
                message: "post not found"
            })
        }

        res.send({
            message: "post fetched",
            data: post[0]
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.post('/posts', async (req, res) => {

    const { title, text } = req?.body

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!text || text?.trim() === "") {
        return res.status(400).send({
            message: "text is required"
        })
    }

    try {

        const insertResponse = await db.query('INSERT INTO posts_table (title, text, created_on) VALUES (? , ? , ?)', [
            title, text, moment(new Date()).format('YYYY-MM-DD')
        ])

        res.send({
            message: `post added successfully with id: ${insertResponse[0]?.insertId}`
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.put('/posts/:postId', async (req, res) => {

    const { postId } = req?.params
    const { title, text } = req?.body

    if (!postId) {
        return res.status(400).send({
            message: "postId is required"
        })
    }

    if (!title || title?.trim() === "") {
        return res.status(400).send({
            message: "title is required"
        })
    }

    if (!text || text?.trim() === "") {
        return res.status(400).send({
            message: "text is required"
        })
    }

    try {

        const updateResponse = await db.query(`UPDATE posts_table SET title = ?, text = ? WHERE id = ?`, [
            title, text, postId
        ]);

        if (updateResponse) {
            return res.status(404).send({
                message: "post not found"
            })
        }

        res.send({
            message: `post updated successfully with id: ${postId}`
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

router.delete('/posts/:postId', async (req, res) => {

    const { postId } = req?.params

    if (!postId) {
        return res.status(400).send({
            message: "postId is required"
        })
    }

    try {

        const deleteResponse = await db.query(`DELETE FROM posts_table WHERE id = ?`, [
            postId
        ]);

        if (deleteResponse) {
            return res.status(404).send({
                message: "post not found"
            })
        }

        res.send({
            message: `post deleted successfully with id: ${postId}`
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: "internal server error",
            error: error?.message
        })
    }

})

export default router