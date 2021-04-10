import { handleClick } from './scripts/handlers'
// Select all buttons to choose what background to load
const buttons = document.querySelectorAll('.bg-buttons')

// Add listener to load a background
buttons.forEach(button => {
  button.addEventListener('click', handleClick)
})
