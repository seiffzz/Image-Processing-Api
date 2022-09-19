import { Router } from 'express'
import images_routes from './api/images'

const routes = Router()

routes.use('/api', images_routes)

export default routes
