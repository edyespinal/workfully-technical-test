import { NextFunction, Request, Response } from 'express'
import { getUserByEmailService } from '../../users/model/services'
import {
  encryptPassword,
  generateSessionToken,
} from '../../../utils/authentication'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as Record<string, string>

    if (!email || !password) {
      throw new CustomError({
        message: 'Unable to login',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing credentials',
      })
    }

    const user = await getUserByEmailService(email)

    if (!user || !user.authentication) {
      throw new CustomError({
        message: 'Unable to login',
        status: 401,
        code: 'AUTHENTICATION_ERROR',
        reason: 'Invalid credentials',
      })
    }

    const hash = encryptPassword(password, user.authentication.salt)

    if (hash !== user.authentication.password) {
      throw new CustomError({
        message: 'Unable to login',
        status: 401,
        code: 'AUTHENTICATION_ERROR',
        reason: 'Invalid credentials',
      })
    }

    const accessToken = generateSessionToken({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    })

    user.authentication.accessToken = accessToken

    await user.save()

    res.cookie('accessToken', user.authentication.accessToken, {
      domain: process.env.COOKIES_DOMAIN,
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })

    return res
      .status(200)
      .json({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        accessToken,
        tokenType: 'Bearer',
      })
      .end()
  } catch (error) {
    next(error)
  }
}
