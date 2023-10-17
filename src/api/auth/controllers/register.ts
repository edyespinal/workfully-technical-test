import { Request, Response } from 'express'

export async function register(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'register' })
  } catch (error) {
    res.sendStatus(500)
  }
}
