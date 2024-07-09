// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Function to mimic server call
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Your JavaScript code goes here!

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Select all hearts
  const hearts = document.querySelectorAll('.like-glyph');
  
  // Select the error modal and message
  const errorModal = document.getElementById('modal');
  const errorMessage = document.getElementById('modal-message');
  
  // Hide the error modal by default
  errorModal.classList.add('hidden');

  // Function to handle heart click
  const handleHeartClick = (heart) => {
    mimicServerCall()
      .then(() => {
        if (heart.innerText === EMPTY_HEART) {
          heart.innerText = FULL_HEART;
          heart.classList.add('activated-heart');
        } else {
          heart.innerText = EMPTY_HEART;
          heart.classList.remove('activated-heart');
        }
      })
      .catch((error) => {
        errorModal.classList.remove('hidden');
        errorMessage.innerText = error;
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  };

  // Attach click event listeners to each heart
  hearts.forEach((heart) => {
    heart.addEventListener('click', () => handleHeartClick(heart));
  });
});
