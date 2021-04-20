// Select elements for file upload and image to be replaced
const uploadBtn = document.querySelector('#uploaded-file')
let exportURL
// Function to extract Img URL and change displayed image
const getImage = (e) => {
  // Transform Blob to URL
  const image = document.querySelector('img')
  const imgURL = window.URL.createObjectURL(e.target.files[0])
  // Change the image displayed
  image.src = imgURL
  exportURL = imgURL
}

uploadBtn.addEventListener('change', getImage)

console.log(exportURL)

export default exportURL
