import supertest from 'supertest'
import app from '../../index'
import { resizeImage, checkIfImageExists } from '../../utils'
import path from 'path'

const request = supertest(app)
const config = {
  filename: 'upwork',
  width: 500,
  height: 500,
  outPath: './assets/thumb',
}

describe('Testing the resize functionality', () => {
  it('Passing an image that does not exist', async () => {
    expect(
      await resizeImage(
        path.resolve('./') + `/assets/full/non-existing-image.jpg`,
        config.width,
        config.height,
        config.outPath
      )
    ).toContain('Input file is missing')
  })
  it('Passing an image that does exist', async () => {
    expect(
      await resizeImage(
        path.resolve('./') + `/assets/full/${config.filename}.jpg`,
        config.width,
        config.height,
        config.outPath
      )
    ).toContain(`${config.filename}_${config.width}x${config.height}.jpg`)
  })
})

describe('Testing the image existence functionality', () => {
  it('Passing an image path that does not exist', () => {
    expect(checkIfImageExists('/assets/full/non-existing-file.jpg')).toBe(false)
  })
  it('Passing an image path that does exist', () => {
    expect(checkIfImageExists(`/assets/full/${config.filename}.jpg`)).toBe(true)
  })
})

describe('Testing the API endpoint', () => {
  it('Not passing query params [filename, width, height]', async () => {
    await request.get('/api/images/resize/').expect(400)
  })
  it('Passing non existing filename', async () => {
    await request
      .get(
        `/api/images/resize/?filename=none&width=${config.width}&height=${config.height}`
      )
      .expect(404)
  })
  it('Passing all query params [filename, width, height]', async () => {
    await request
      .get(
        `/api/images/resize/?filename=${config.filename}&width=${config.width}&height=${config.height}`
      )
      .expect(200)
  })
  it('Passing non numeric width and/or height', async () => {
    await request
      .get(`/api/images/resize/?filename=${config.filename}&width=s&height=s`)
      .expect(400)
  })
})
