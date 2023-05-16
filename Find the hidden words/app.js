'use strict';

// select element
const hangmanBody = document.querySelectorAll('.hangman__body-hidden');
const wrongLetterText = document.querySelector('.hangman__wrong-letter--text');
const wrongLetterContainer = document.querySelector(
  '.hangman__wrong-letter-container'
);
const wrongLetterParagraphy = document.querySelector(
  '.hangman__wrong-letter-paragraphy'
);
const notificationHangman = document.querySelector('.hangman__notification');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const btnPlayAgain = document.querySelector('.btn--play-again');
const hangmanLetters = document.querySelector('.hangman__letter-press');

// arrrays of words
const words = [
  'programming',
  'wizard',
  'witch',
  'wizkid',
  'davido',
  'travis',
  'justin',
];

// get the word from words array randomly
let randomWord = words[Math.floor(Math.random() * words.length)];

// array of correct word
const correctLetter = [];

// array of wrong letter
const wrongLetter = [];

// render the word to the user interface
const renderWord = function () {
  // 1) split the word into an array to be able to create border for them each
  // 2) map through the letter to create the border and insert the correct letter to right element
  // 3) then join the array to convert them to string
  hangmanLetters.innerHTML = `
  ${randomWord
    .split('')
    .map(
      letter =>
        `<span class="hangman__border">${
          correctLetter.includes(letter) ? letter : '&nbsp;'
        }</span>`
    )
    .join('')}
  `;

  // remove the new line character from the hangmanLetters.textContent
  const removeNewLine = hangmanLetters.innerText.replace(/\n/g, '');

  // check if the hangmanLetters length is equal to the correctLetter length
  if (removeNewLine === randomWord) {
    //  remove the hidden class from the modal
    modal.classList.remove('hidden');

    // change the modal text dynamically
    modalText.textContent = 'Congratulation! You won 😁';
  }
};

renderWord();

// render the hangman diagram to the user interface and the wrong letter
const renderError = function () {
  //  check if the wrong letter array letter is greater than 0
  if (wrongLetter.length > 0) {
    // remove the hidden class from wrong letter paragraphy
    wrongLetterParagraphy.classList.remove('hidden');

    // remove the hidden class from wrong letter text
    wrongLetterText.classList.remove('hidden');

    // render the wrong letters to the user interface
    wrongLetterText.innerHTML = `${wrongLetter.map(
      letter => `<span>${letter}</span>`
    )}`;
  }

  // build the hangman diagram when the user pressed wrong letter
  hangmanBody.forEach((part, index) => {
    // get the length of the wrong letter array
    const wrongLetterLength = wrongLetter.length;

    // check if the index of the hangman body part is less than the wrong letter length
    if (wrongLetterLength > index) {
      // remove the hangman body hidden class from the part that the index is less than wrong letter array length
      part.classList.remove('hangman__body-hidden');
    } else {
      // add the hangman body hidden class from the part that the index is less than wrong letter array length
      part.classList.add('hangman__body-hidden');
    }
  });

  // if the wrong letter length is equal to the hangmanBody length then the user lost the game
  if (wrongLetter.length === hangmanBody.length) {
    // remove the hidden class from the modal
    modal.classList.remove('hidden');

    // change the modal text dynamically
    modalText.textContent = 'Unfortunately you lost. 😟';
  }
};

const renderNotification = function () {
  // display the notification if the letter is pressed more one time
  notificationHangman.classList.remove('notification-hidden');

  // add the notification-hidden to the notification element after 3 secs
  setTimeout(() => {
    notificationHangman.classList.add('notification-hidden');
  }, 3000);
};

// reset the game
btnPlayAgain.addEventListener('click', function () {
  // empty both correctLetter array and wrongLetter array
  correctLetter.splice(0);
  wrongLetter.splice(0);

  // get the word randomly
  randomWord = words[Math.floor(Math.random() * words.length)];

  // display the new word to the user interface
  renderWord();

  // display the new wrong letters to the user interface
  renderError();

  // hide the modal
  modal.classList.add('hidden');
});

// key board events
document.addEventListener('keydown', function (e) {
  // check for only alphabets
  if (e.key >= 'a' && e.key <= 'z') {
    // store the letter press in a variable
    const letter = e.key;

    // check if the letter press is include in the randomWord variable
    if (randomWord.includes(letter)) {
      // push the letter press into correctWord array and check for duplicate letter
      if (!correctLetter.includes(letter)) {
        // push the letter to the correctLetter array
        correctLetter.push(letter);

        // display the letter to the user interface
        renderWord();
      } else {
        // display the notification alert to the user if the letter has been pressed before
        renderNotification();
      }
    } else {
      // check if the letter pressed exist in the wrongLetter array
      if (!wrongLetter.includes(letter)) {
        // push the wrong letter into the wrongLetter array
        wrongLetter.push(letter);

        // render the error to the user interface
        renderError();
      } else {
        // display the notification alert to the user if the letter has been pressed before
        renderNotification();
      }
    }
  }
});
