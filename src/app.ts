import express, { type Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { apiRouter } from './api'
import './services/db'

const app: Application = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.json({ message: 'Hi Workfully!' })
})

app.use('/api', apiRouter)

export default app
