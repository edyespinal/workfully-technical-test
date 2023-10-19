import { Router } from 'express'
import { healthCheck } from './controllers'

const healthCheckRouter = Router()

healthCheckRouter.get('/', healthCheck)

export { healthCheckRouter }
