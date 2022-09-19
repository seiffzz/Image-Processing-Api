import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes/index'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(morgan('dev'))

// register routes
app.use('/', routes)
// start server
app.listen(PORT, () => {
  console.log(`Server is running at prot:${PORT}`)
})
export default app
