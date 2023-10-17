import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from './controllers'
import { isAuthenticated, isAuthorizedOwner } from '../../middlewares'

const usersRouter = Router()

usersRouter.get('/', isAuthenticated, getAllUsers)
usersRouter.post('/', isAuthenticated, createUser)
usersRouter.get('/:id', isAuthenticated, getUser)
usersRouter.get('/:id/profile', isAuthenticated, isAuthorizedOwner, getUser)
usersRouter.patch('/:id', isAuthenticated, isAuthorizedOwner, updateUser)
usersRouter.delete('/:id', isAuthenticated, isAuthorizedOwner, deleteUser)

export { usersRouter }
