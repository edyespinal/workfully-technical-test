import { NextFunction, Request, Response } from 'express'
import { getUserByIdService } from '../model/services'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    if (!id) {
      throw new CustomError({
        message: 'Unable to get user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing required fields',
      })
    }

    const user = await getUserByIdService(id)

    if (!user) {
      throw new CustomError({
        message: 'Unable to get user',
        status: 404,
        code: 'NOT_FOUND',
        reason: 'User not found',
      })
    }

    res.status(200).send(user).end()
  } catch (error) {
    next(error)
  }
}
