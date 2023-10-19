import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../middlewares/errorHandling/customError'

export async function healthCheck(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).json({ message: 'OK' })
  } catch {
    next(
      new CustomError({
        message: 'Unable to check health',
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        reason: 'Something went wrong',
      })
    )
  }
}
