import { Request, Response } from 'express'
import { getUserByIdService, updateUserService } from '../model/services'

export async function updateUser(req: Request, res: Response) {
  try {
    const { username, name, lastName } = req.body
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Missing id' })
    }

    const user = await getUserByIdService(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const updatedUser = await updateUserService(id, {
      username: username || user.username,
      name: name || user.name,
      lastName: lastName || user.lastName,
    })

    res.status(200).send(updatedUser).end()
  } catch (error) {
    res.sendStatus(500)
  }
}
