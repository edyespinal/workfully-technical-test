import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from './controllers'

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
usersRouter.get('/:id', getUser)
usersRouter.get('/:id/profile', getUser)
usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export { usersRouter }
