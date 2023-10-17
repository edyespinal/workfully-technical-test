import { Router } from 'express'

import healthCheckRouter from './healthCheck'
import authRouter from './auth'
import usersRouter from './users'

const apiRouter = Router()

apiRouter.use('/health-check', healthCheckRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/users', usersRouter)

export { apiRouter }
