import { Request, Response } from 'express'

export async function getAllUsers(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'getAllUsers' })
  } catch (error) {
    res.sendStatus(500)
  }
}
