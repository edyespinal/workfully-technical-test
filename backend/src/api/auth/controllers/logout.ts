import { NextFunction, Request, Response } from 'express'
import { getUserByAccessTokenService } from '../../users/model/services'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      throw new CustomError({
        message: 'Unable to logout',
        status: 401,
        code: 'AUTHENTICATION_ERROR',
        reason: 'Missing accessToken',
      })
    }

    const user = await getUserByAccessTokenService(accessToken)

    if (!user || !user.authentication) {
      throw new CustomError({
        message: 'Unable to logout',
        status: 401,
        code: 'AUTHENTICATION_ERROR',
        reason: 'Invalid accessToken',
      })
    }

    user.authentication.accessToken = undefined

    await user.save()

    res.clearCookie('accessToken', {
      domain: process.env.COOKIES_DOMAIN,
      path: '/',
      httpOnly: true,
    })

    return res.status(200).json({ message: 'Logged out' }).end()
  } catch (error) {
    next(error)
  }
}
