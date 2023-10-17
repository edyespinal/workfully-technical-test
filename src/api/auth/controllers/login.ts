import { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'login' })
  } catch (error) {
    res.sendStatus(500)
  }
}
