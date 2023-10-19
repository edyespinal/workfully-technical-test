import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken } = req.cookies

    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decodedPayload = jwt.verify(accessToken, process.env.HASH_SECRET)

    res.locals.session = decodedPayload

    next()
  } catch (error) {
    return res.sendStatus(401)
  }
}
