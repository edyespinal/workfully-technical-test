import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export function generateSalt(bytes = 128) {
  return crypto.randomBytes(bytes).toString('base64')
}

export function encryptPassword(password: string, salt: string) {
  return crypto
    .createHmac('sha256', [salt, password].join(':'))
    .update(process.env.HASH_SECRET as string)
    .digest('hex')
}

export type SessionTokenPayload = {
  id: string
  username: string
  email: string
}

export function generateSessionToken(payload: SessionTokenPayload) {
  return jwt.sign(payload, process.env.HASH_SECRET as string, {
    expiresIn: '1h',
  })
}
