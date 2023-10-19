import { NextFunction, Request, Response } from 'express'
import { getAllUsersService } from '../model/services'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllUsersService()

    res.status(200).send(users).end()
  } catch (error) {
    next(
      new CustomError({
        message: 'Unable to get all users',
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        reason: 'Something went wrong',
      })
    )
  }
}
