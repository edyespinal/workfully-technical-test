import { Request, Response } from 'express'
import {
  encryptPassword,
  generateSalt,
  generateSessionToken,
} from '../../../utils/authentication'
import { getUserByEmailService } from '../../users/model/services'
import { User, UserModel } from '../../users/model'

export async function register(req: Request, res: Response) {
  try {
    const {
      username,
      email,
      password,
      name = '',
      lastName = '',
    } = req.body as Record<string, string>

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const existingUser = await getUserByEmailService(email)

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = generateSalt()

    const user = (await new UserModel({
      username,
      email,
      name,
      lastName,
      authentication: {
        salt,
        password: encryptPassword(password, salt),
      },
    }).save()) as User

    if (!user || !user.authentication) {
      return res.status(500).json({ message: 'Could not create user' })
    }

    user.authentication.accessToken = generateSessionToken({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    })

    await user.save()

    res.cookie('session', user.authentication.accessToken, {
      domain: process.env.COOKIES_DOMAIN,
      path: '/',
      httpOnly: true,
    })

    return res.status(201).json({ username, email, name, lastName }).end()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    res.sendStatus(500)
  }
}
