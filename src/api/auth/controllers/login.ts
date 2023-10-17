import { Request, Response } from 'express'
import { getUserByEmailService } from '../../users/model/services'
import {
  encryptPassword,
  generateSessionToken,
} from '../../../utils/authentication'

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as Record<string, string>

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const user = await getUserByEmailService(email)

    if (!user || !user.authentication) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    const hash = encryptPassword(password, user.authentication.salt)

    if (hash !== user.authentication.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    user.authentication.accessToken = generateSessionToken({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    })

    await user.save()

    res.cookie('accessToken', user.authentication.accessToken, {
      domain: process.env.COOKIES_DOMAIN,
      path: '/',
      httpOnly: true,
    })

    return res
      .status(200)
      .json({
        AccessToken: user.authentication.accessToken,
        tokenType: 'Bearer',
      })
      .end()
  } catch (error) {
    return res.sendStatus(500)
  }
}
