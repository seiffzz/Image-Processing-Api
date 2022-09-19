import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const resizeImage = async (
  imagePath: string,
  width: number,
  height: number,
  outputPath: string
): Promise<string> => {
  try {
    const imageName = imagePath.split('/').at(-1) as string
    const resizedImageName = `${imageName
      .split('.')
      .at(0)}_${width}x${height}.jpg`
    await sharp(imagePath)
      .resize({ width, height })
      .toFile(`${outputPath}/${resizedImageName}`)
    return resizedImageName
  } catch (err: unknown) {
    return (err as Error).message
  }
}

const checkIfImageExists = (imagePath: string): boolean => {
  return fs.existsSync(path.resolve('./') + imagePath)
}

export { resizeImage, checkIfImageExists }
