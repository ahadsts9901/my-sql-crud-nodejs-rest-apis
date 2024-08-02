import express, { json } from "express"
import morgan from "morgan"
import { connect_db } from "./config/db.mjs"
import postRoutes from "./routes/posts.mjs"

const app = express()

app.use(json())
app.use(morgan('dev'))

connect_db()

app.use('/api/v1', postRoutes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))