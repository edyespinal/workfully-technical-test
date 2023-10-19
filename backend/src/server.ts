import app from './app'

const PORT = process.env.PORT

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running in http://localhost:${PORT}`)
})
