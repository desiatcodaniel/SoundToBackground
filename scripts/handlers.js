import { loadImage } from './generateCanvas'
import { filterBG } from './filter'
import image from '../images/sample.webp'

const canvas = loadImage(image)

export const handleClick = async (e) => {
  // Select spinner to toggle
  const toggler = e.currentTarget.querySelectorAll('span')
  toggler.forEach(item => item.classList.toggle('hidden'))
  console.log(toggler)
  await filterBG(canvas, e.currentTarget.textContent)
  // change to practice sourcetree
  toggler.forEach(item => item.classList.toggle('hidden'))
}
