import { NextFunction, Request, Response } from 'express'
import { getUserByIdService, updateUserService } from '../model/services'
import { CustomError } from '../../../middlewares/errorHandling/customError'

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, name, lastName } = req.body
    const { id } = req.params

    if (!id) {
      throw new CustomError({
        message: 'Unable to update user',
        status: 400,
        code: 'BAD_REQUEST',
        reason: 'Missing required fields',
      })
    }

    const user = await getUserByIdService(id)

    if (!user) {
      throw new CustomError({
        message: 'Unable to update user',
        status: 404,
        code: 'NOT_FOUND',
        reason: 'User not found',
      })
    }

    const updatedUser = await updateUserService(id, {
      username: username || user.username,
      name: name || user.name,
      lastName: lastName || user.lastName,
    })

    res.status(200).send(updatedUser).end()
  } catch (error) {
    next(error)
  }
}
