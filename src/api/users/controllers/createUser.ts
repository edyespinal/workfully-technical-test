import { Request, Response } from 'express'

export async function createUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'createUser' })
  } catch (error) {
    res.sendStatus(500)
  }
}
