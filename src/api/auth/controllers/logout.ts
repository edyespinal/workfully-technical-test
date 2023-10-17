import { Request, Response } from 'express'
import { getUserByAccessTokenService } from '../../users/model/services'

export async function logout(req: Request, res: Response) {
  try {
    const { session } = req.cookies

    if (!session) {
      return res.status(400).json({ message: 'Missing session cookie' })
    }

    const user = await getUserByAccessTokenService(session)

    if (!user || !user.authentication) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    user.authentication.accessToken = undefined

    await user.save()

    res.clearCookie('session', {
      domain: process.env.COOKIES_DOMAIN,
      path: '/',
      httpOnly: true,
    })

    return res.status(200).json({ message: 'Logged out' }).end()
  } catch (error) {
    console.error(error)

    return res.sendStatus(500)
  }
}
