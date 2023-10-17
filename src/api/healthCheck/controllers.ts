import { Request, Response } from 'express'

export async function healthCheck(_req: Request, res: Response) {
  try {
    res.status(200).json({ message: 'OK' })
  } catch {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
