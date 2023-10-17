import express, { type Application } from 'express'
import { apiRouter } from './api'

const app: Application = express()

app.get('/', (_req, res) => {
  res.json({ message: 'Hi Workfully!' })
})

app.use('/api', apiRouter)

export default app
