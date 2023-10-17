import { Request, Response } from 'express'

export async function getUserProfile(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'getUserProfile' })
  } catch (error) {
    res.sendStatus(500)
  }
}
