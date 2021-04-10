import { loadImage } from './generateCanvas'
import { filterBG } from './filter'
import image from '../images/couple.jpeg'

const canvas = loadImage(image)

export const handleClick = async (e) => {
  const spinner = e.currentTarget.querySelector('.hidden')
  console.log(e.currentTarget)
  spinner.classList.toggle('hidden')
  await filterBG(canvas, e.currentTarget.textContent)
  spinner.classList.toggle('hidden')
}
