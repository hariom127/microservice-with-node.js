import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT Key must be defined!')
    }

    if (!process.env.MONGO_URI) {
      throw new Error('Mongo uri Key must be defined!')
    }

    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log('coonect to DB on==>')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('listening on port 3000!!!!!!!')
  })
}
start()
