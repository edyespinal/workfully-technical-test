import { Request, Response } from 'express'

export async function logout(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'logout' })
  } catch (error) {
    res.sendStatus(500)
  }
}
