import { Router, Request, Response } from 'express'
import path from 'path'
import { resizeImage, checkIfImageExists } from '../../utils'
import { query, validationResult } from 'express-validator'

const images_routes = Router()

images_routes.get(
  '/images',
  query('filename').isAlphanumeric(),
  query('width').isNumeric(),
  query('height').isNumeric(),
  async (req: Request, res: Response) => {
    // check for validation error
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    } else {
      const fileName = req.query.filename as string
      const width = req.query.width as string
      const height = req.query.height as string

      // check if the full image exists
      if (checkIfImageExists(`/assets/full/${fileName}.jpg`)) {
        const resizedImageName = `${fileName}_${width}x${height}.jpg`

        // check if the image is already cashed
        if (checkIfImageExists(`/assets/thumb/${resizedImageName}`)) {
          return res.sendFile(
            path.resolve('./') + `/assets/thumb/${resizedImageName}`
          )
        } else {
          // resize image
          const resizedImageName = await resizeImage(
            path.resolve('./') + `/assets/full/${fileName}.jpg`,
            parseInt(width),
            parseInt(height),
            './assets/thumb'
          )
          res.sendFile(path.resolve('./') + `/assets/thumb/${resizedImageName}`)
        }
      } else {
        res
          .status(404)
          .send(
            'Resource not found, make sure to place the image in the assets/full folder!'
          )
      }
    }
  }
)

export default images_routes
