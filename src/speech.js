import { handleInput } from './handlers';
// Set speech recognition API based on the browser that supports it
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function startSpeech() {
  // Check if the browser supports the Speech Recognition
  if (!('SpeechRecognition' in window)) {
    console.log('Browser does not support Speech Recognition');
    return;
  }
  // It works so we continue
  console.log('Starting...');
  // Make a new speech recognition
  const recognition = new SpeechRecognition();
  // Continually look for speech recognition
  recognition.continuous = true;
  // Continually provide results even when not done speaking yet
  recognition.interimResults = false;
  // Similar to defining a callback for a listener
  recognition.onresult = handleInput;
  // Start listening
  recognition.start();
}
