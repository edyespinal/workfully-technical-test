import { Request, Response, NextFunction } from 'express'
import { CustomError } from './customError'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      errors: [
        {
          message: err.message,
          code: err.code,
          reason: err.reason,
        },
      ],
    })
  }

  return res.status(500).json({
    errors: [
      { message: 'Something went wrong.', code: 'INTERNAL_SERVER_ERROR' },
    ],
  })
}
