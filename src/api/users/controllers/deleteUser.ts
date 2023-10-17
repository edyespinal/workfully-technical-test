import { Request, Response } from 'express'
import { deleteUserService } from '../model/services'

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Missing id' })
    }

    await deleteUserService(id)

    res.status(204).end()
  } catch (error) {
    res.sendStatus(500)
  }
}
