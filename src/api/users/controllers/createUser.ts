import { Request, Response } from 'express'
import { createUserService, getUserByEmailService } from '../model/services'
import { encryptPassword, generateSalt } from '../../../utils/authentication'

export async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password, name = '', lastName = '' } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const existingUser = await getUserByEmailService(email)

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const salt = generateSalt()

    const user = await createUserService({
      username,
      name,
      lastName,
      email,
      authentication: {
        salt,
        password: encryptPassword(password, salt),
      },
    })

    res.status(201).send(user).end()
  } catch (error) {
    res.sendStatus(500)
  }
}
