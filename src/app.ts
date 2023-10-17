import express, { type Application } from 'express'

const app: Application = express()

app.get('/', (_req, res) => {
  res.json({ message: 'Hi Workfully!' })
})

export default app
