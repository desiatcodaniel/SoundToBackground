import image from './images/kat.jpeg'
import * as tf from '@tensorflow/tfjs'
import * as bodyPix from '@tensorflow-models/body-pix'

function loadImage (src) {
  const img = new Image()
  const canvas = document.querySelector('#before')
  const ctx = canvas.getContext('2d')
  img.src = src
  // Load image into canvas
  img.addEventListener('load', () => {
    // Set width, height to dynamically adjust to image being used.
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }, false)
  // Call pop if using gray effect
  filterBG(true)
}

async function filterBG (isPop = false) {
  // Load model - Read bodyPix documentation
  const net = await bodyPix.load({
    architecture: 'ResNet50',
    outputStride: 32,
    quantBytes: 2
  })

  // Segment Image
  const imageToSegment = document.querySelector('#before')
  const { data: imgToMap } = await net.segmentPerson(imageToSegment, { internalResolution: 'full' })
  const ctx = imageToSegment.getContext('2d')
  const { data: imgData } = ctx.getImageData(0, 0, imageToSegment.width, imageToSegment.height)
  // Create new image data to draw
  const newImg = ctx.createImageData(imageToSegment.width, imageToSegment.height)
  const { data: newImgData } = newImg
  // Apply desired effect
  for (let i = 0; i < imgToMap.length; i++) {
    const [r, g, b, a] = [imgData[i * 4], imgData[i * 4 + 1], imgData[i * 4 + 2], imgData[i * 4 + 3]]
    // Make background transparent by turning all a to 0 IF the current
    if (imgToMap[i] === 1) {
      newImgData[i * 4] = r
      newImgData[i * 4 + 1] = g
      newImgData[i * 4 + 2] = b
      newImgData[i * 4 + 3] = a
    }
    // Set gray color of non Person if isPop is set to true
    const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b))
    if (isPop && !imgToMap[i]) {
      newImgData[i * 4] = gray
      newImgData[i * 4 + 1] = gray
      newImgData[i * 4 + 2] = gray
      newImgData[i * 4 + 3] = 255
    }
  }
  // Create new canvas
  const canvasAfter = document.querySelector('#after')
  const ctxAfter = canvasAfter.getContext('2d')
  canvasAfter.width = imageToSegment.width
  canvasAfter.height = imageToSegment.height
  ctxAfter.putImageData(newImg, 0, 0)
}

loadImage(image)
