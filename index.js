import { handleClick, handleUpload } from './scripts/handlers'
// Select elements for file upload and image to be replaced
const uploadBtn = document.querySelector('#uploaded-file')
// Select all buttons to choose what background to load
const buttons = document.querySelectorAll('.bg-buttons')

// Add listener to load a background
buttons.forEach(button => {
  button.addEventListener('click', handleClick)
})

uploadBtn.addEventListener('change', handleUpload)

// CREATE VIDEO CAPABILITY NEXT
