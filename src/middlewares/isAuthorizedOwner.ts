import { NextFunction, Request, Response } from 'express'

export async function isAuthorizedOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { session } = res.locals
    const { id } = req.params

    if (!session || !id || session.id !== id) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  } catch (error) {
    return res.sendStatus(500)
  }
}
