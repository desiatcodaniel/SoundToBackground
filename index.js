import image from './images/kat.jpeg'

function loadImage (src) {
  const img = new Image()
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  img.src = src
  // Load image into canvas
  img.addEventListener('load', () => {
    // Set width, height to dynamically adjust to image being used.
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }, false)
}
loadImage(image)
