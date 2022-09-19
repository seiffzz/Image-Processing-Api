import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

/**
 * @desc Resizes the passed image
 * to the passed width and height
 * and write the new image to the
 * passed output directory.
 *
 * @param imagePath the path of the
 * image to be resized.
 *
 * @param width the width of the new
 * image.
 *
 * @param height the height of the new
 * image
 *
 * @param outputPath the path for the
 * new image to be saved at.
 *
 * @return string the new image name or error
 * message
 */
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

/**
 * @desc Checks if a file
 * exist at the passed path or not.
 *
 * @param imagePath the path of the
 * file that we want to check for.
 *
 * @return boolean true/false
 */
const checkIfImageExists = (imagePath: string): boolean => {
  return fs.existsSync(path.resolve('./') + imagePath)
}

export { resizeImage, checkIfImageExists }
