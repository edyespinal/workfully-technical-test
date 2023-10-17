import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserProfile,
  updateUser,
} from './controllers'

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
usersRouter.get('/:id', getUser)
usersRouter.get('/:id/profile', getUserProfile)
usersRouter.patch('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export { usersRouter }
