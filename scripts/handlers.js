import { loadImage } from './generateCanvas'
import { filterBG } from './filter'

export const handleUpload = (e) => {
  // Transform Blob to URL
  const image = document.querySelector('img')
  const imgURL = window.URL.createObjectURL(e.target.files[0])
  // Change the image displayed
  image.src = imgURL
}

export const handleClick = async (e) => {
  // Select image to process - Must be the image source
  const canvas = loadImage(document.querySelector('img').src)
  // Select spinner to toggle
  const toggler = e.currentTarget.querySelectorAll('span')
  toggler.forEach(item => item.classList.toggle('hidden'))
  await filterBG(canvas, e.currentTarget.textContent)
  // change to practice sourcetree
  toggler.forEach(item => item.classList.toggle('hidden'))
}
