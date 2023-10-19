import { NextFunction, Request, Response } from 'express'
import { deleteUserService } from '../model/services'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params

    if (!id) {
      throw new CustomError({
        message: 'Unable to delete user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing required fields',
      })
    }

    await deleteUserService(id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
