import { Request, Response } from 'express'
import { getUserByIdService } from '../model/services'

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Missing id' })
    }

    const user = await getUserByIdService(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).send(user).end()
  } catch (error) {
    res.sendStatus(500)
  }
}
