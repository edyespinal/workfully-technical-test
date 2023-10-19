import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { apiRouter } from './api'
import './services/db'
import { methodNotAllowed } from './middlewares/methodNotAllowed'
import { errorHandler } from './middlewares/errorHandling/errorHandler'

const app: Application = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.json({ message: 'Hi Workfully!' })
})

app.use('/api', apiRouter)
app.use('*', methodNotAllowed)
app.use(errorHandler)

export default app
