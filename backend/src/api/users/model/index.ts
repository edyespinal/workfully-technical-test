import mongoose, { Document } from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  lastName: String,
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
    accessToken: {
      type: String,
      select: false,
    },
  },
})

export const UserModel = mongoose.model('User', userSchema)

export type User = Document & {
  username: string
  email: string
  name: string
  lastName: string
  authentication: {
    password: string
    salt: string
    accessToken?: string
  }
}
