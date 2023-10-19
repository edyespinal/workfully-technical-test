import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connect(process.env.DATABASE_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection

connection.on('error', () => {
  console.error('Error connecting to database')

  process.exit(1)
})
