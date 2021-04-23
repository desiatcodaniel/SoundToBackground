import { handleUpload, handleInput } from "./src/handlers";
import { startSpeech } from "./src/speech";
// Select elements for file upload and image to be replaced
const uploadBtn = document.querySelector("#uploaded-file");
// Select all buttons to choose what background to load
const buttons = document.querySelectorAll(".bg-buttons");

// Add listener to load a background
buttons.forEach((button) => {
  button.addEventListener("click", handleInput);
});
// const safeSpeech = async () => {
//   await startSpeech();
// };
// safeSpeech();
startSpeech();

uploadBtn.addEventListener("change", handleUpload);

// CREATE VIDEO CAPABILITY NEXT
