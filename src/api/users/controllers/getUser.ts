import { Request, Response } from 'express'

export async function getUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'getUser' })
  } catch (error) {
    res.sendStatus(500)
  }
}
