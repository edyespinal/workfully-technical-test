import { Request, Response } from 'express'

export function methodNotAllowed(req: Request, res: Response) {
  return res.status(405).json({ message: `Method ${req.method} not allowed.` })
}
