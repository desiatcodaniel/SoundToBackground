import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import backgrounds from './images';

export default async function filterBG(imageToSegment, filter) {
  // Select resulting image place
  const resultArea = document.querySelector('img');
  // Load model - Read bodyPix documentation
  const net = await bodyPix.load({
    architecture: 'ResNet50',
    outputStride: 32,
    quantBytes: 2,
  });

  // Segment image
  /** ********************
   * imgToMap - The indices will show 1 if it is part of the person, 0 if not
   * imgData - Will show RGBA values of each imgToMap index(image pixel) imgToMap[0] will
   *              have imgData[0,1,2,3] as its RGBA
   */
  // Pull out imageData of the detected person/s
  const { data: imgToMap } = await net.segmentPerson(imageToSegment, {
    internalResolution: 'full',
  });
  const ctx = imageToSegment.getContext('2d');
  // Pull out imageData of the entire image
  const { data: imgData } = ctx.getImageData(
    0,
    0,
    imageToSegment.width,
    imageToSegment.height,
  );
  // Create a new imageData that is the same size
  const newImg = ctx.createImageData(
    imageToSegment.width,
    imageToSegment.height,
  );
  const { data: newImgData } = newImg;
  // Apply desired effect
  for (let i = 0; i < imgToMap.length; i += 1) {
    const [r, g, b, a] = [
      imgData[i * 4],
      imgData[i * 4 + 1],
      imgData[i * 4 + 2],
      imgData[i * 4 + 3],
    ];
    // Make background transparent by turning all a to 0
    if (imgToMap[i] === 1) {
      newImgData[i * 4] = r;
      newImgData[i * 4 + 1] = g;
      newImgData[i * 4 + 2] = b;
      newImgData[i * 4 + 3] = a;
    }
    // Set gray color of non Person if isPop is set to true
    const gray = 0.3 * r + 0.59 * g + 0.11 * b;
    if (filter === 'grayscale' && !imgToMap[i]) {
      newImgData[i * 4] = gray;
      newImgData[i * 4 + 1] = gray;
      newImgData[i * 4 + 2] = gray;
      newImgData[i * 4 + 3] = 255;
    }
  }
  // Create new canvas element, putImagedata, convert into img tag so we can resize
  const canvasAfter = document.createElement('canvas');
  const ctxAfter = canvasAfter.getContext('2d');
  canvasAfter.width = imageToSegment.width;
  canvasAfter.height = imageToSegment.height;
  ctxAfter.putImageData(newImg, 0, 0);

  // Put it in an image tag to make it fluid
  resultArea.src = canvasAfter.toDataURL();

  // Set CSS background if romantic or tropical
  if (filter === 'original') { resultArea.style.background = `url(${backgrounds[0]})`; }
  if (filter === 'tropical') { resultArea.style.background = `url(${backgrounds[1]})`; }
  if (filter === 'romantic') { resultArea.style.background = `url(${backgrounds[2]})`; }
  resultArea.style.backgroundRepeat = 'no-repeat';
  resultArea.style.backgroundSize = 'cover';
}
