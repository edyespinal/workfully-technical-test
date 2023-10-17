import { Request, Response } from 'express'
import { getAllUsersService } from '../model/services'

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getAllUsersService()

    res.status(200).send(users).end()
  } catch (error) {
    res.sendStatus(500)
  }
}
