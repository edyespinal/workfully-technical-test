import { Request, Response } from 'express'

export async function updateUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'updateUser' })
  } catch (error) {
    res.sendStatus(500)
  }
}
