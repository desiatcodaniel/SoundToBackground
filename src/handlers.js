import { loadImage } from './generateCanvas';
import filterBG from './filter';
import backgrounds from './images';

function extractWord({ results }) {
  // Return the word command
  return results[results.length - 1][0].transcript;
}
// Array of valid commands
const commands = ['original', 'grayscale', 'greyscale', 'tropical', 'romantic'];

function checkWord({ results }) {
  const word = results[results.length - 1][0].transcript;

  let isValid = false;
  commands.forEach((command) => {
    if (word.includes(command)) isValid = true;
  });
  return isValid;
}

export const handleUpload = (e) => {
  // Transform Blob to URL
  const image = document.querySelector('img');
  const imgURL = window.URL.createObjectURL(e.target.files[0]);
  // Change the image displayed
  image.src = imgURL;
  // Change the original src in the backgrounds
  backgrounds[0] = imgURL;
};

export const handleInput = async (e) => {
  // Initialize filter that will get passed in
  let filter = '';
  // Select image to process - Must be the image source
  const canvas = loadImage(backgrounds[0]);

  // Execute for voice commands
  if (e.results && checkWord(e)) {
    filter = extractWord(e).trim();

    // Change text of caption bar
    const caption = document.querySelector('.text-detected');
    caption.textContent = `Valid speech detected: ${filter}`;

    // Select the togglers
    const toggler = document.querySelectorAll(`#${filter} span`);
    // Toggle both spans for a spinner
    toggler.forEach((item) => item.classList.toggle('hidden'));
    // Call the function and wait for processing to finish
    await filterBG(canvas, filter);
    // Toggle both spans for a spinner
    toggler.forEach((item) => item.classList.toggle('hidden'));
  }

  // Execute for click commands
  if (e.currentTarget.textContent) {
    filter = e.currentTarget.textContent.trim().toLowerCase();
    // Select spinner to toggle
    const toggler = e.currentTarget.querySelectorAll('span');
    // Toggle both spans for a spinner
    toggler.forEach((item) => item.classList.toggle('hidden'));
    // Call the function and wait for processing to finish
    await filterBG(canvas, filter);
    // Toggle both spans for a spinner
    toggler.forEach((item) => item.classList.toggle('hidden'));
  }
};
