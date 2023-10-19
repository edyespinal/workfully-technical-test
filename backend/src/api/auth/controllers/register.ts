import { NextFunction, Request, Response } from 'express'
import {
  encryptPassword,
  generateSalt,
  generateSessionToken,
} from '../../../utils/authentication'
import { getUserByEmailService } from '../../users/model/services'
import { User, UserModel } from '../../users/model'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      username,
      email,
      password,
      name = '',
      lastName = '',
    } = req.body as Record<string, string>

    if (!username || !email || !password) {
      throw new CustomError({
        message: 'Unable to register user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing required fields',
      })
    }

    const existingUser = await getUserByEmailService(email)

    if (existingUser) {
      throw new CustomError({
        message: 'Unable to register user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Email already in use',
      })
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
      throw new CustomError({
        message: 'Unable to register user',
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        reason: 'Unable to save user',
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
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    })

    return res
      .status(201)
      .json({
        username,
        email,
        name,
        lastName,
        accessToken,
        tokenType: 'Bearer',
      })
      .end()
  } catch (error) {
    next(error)
  }
}
