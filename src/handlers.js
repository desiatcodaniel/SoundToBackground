import { loadImage } from './generateCanvas'
import { filterBG } from './filter'
import { backgrounds } from './images'

export const handleUpload = (e) => {
  // Transform Blob to URL
  const image = document.querySelector('img')
  const imgURL = window.URL.createObjectURL(e.target.files[0])
  // Change the image displayed
  image.src = imgURL
  // Change the original src in the backgrounds
  backgrounds[0] = imgURL
}

export const handleClick = async (e) => {
  // Filter and pass in textContent
  const filter = e.currentTarget.textContent.trim()
  // Select image to process - Must be the image source
  const canvas = loadImage(backgrounds[0])
  // Select spinner to toggle
  const toggler = e.currentTarget.querySelectorAll('span')
  // Toggle both spans for a spinner
  toggler.forEach((item) => item.classList.toggle('hidden'))
  // Call the function and wait for processing to finish
  await filterBG(canvas, filter)
  // Toggle both spans for a spinner
  toggler.forEach((item) => item.classList.toggle('hidden'))
}
