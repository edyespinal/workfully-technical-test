import { NextFunction, Request, Response } from 'express'
import { createUserService, getUserByEmailService } from '../model/services'
import { encryptPassword, generateSalt } from '../../../utils/authentication'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password, name = '', lastName = '' } = req.body

    if (!name || !email || !password) {
      throw new CustomError({
        message: 'Unable to create user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing required fields',
      })
    }

    const existingUser = await getUserByEmailService(email)

    if (existingUser) {
      throw new CustomError({
        message: 'Unable to create user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Email already in use',
      })
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
    next(error)
  }
}
