import { Request, Response } from 'express'

export async function deleteUser(req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'deleteUser' })
  } catch (error) {
    res.sendStatus(500)
  }
}
