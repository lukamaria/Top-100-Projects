'use strict';

// select element
const typingGameStage = document.querySelector('.typing-game__stage');
const typingGameCategory = document.querySelector('.typing-game__category');
const cardFront = document.querySelector('.card__front');
const cardBack = document.querySelector('.card__back');
const typingGameWord = document.querySelector('.typing-game__words');
const countDownTimer = document.querySelector('.time-out');
const score = document.querySelector('.score');
const formInput = document.querySelector('.form__input');
const highScore = document.querySelector('.highscore');
const btnReload = document.querySelector('.btn--reload');
const btnHide = document.querySelector('.btn--hide');

// state variable
let timer = 10;
let timeInterval;
let counter = 0;

// get the index number from the select element
let selectedIndexCategory = typingGameCategory.selectedIndex;

// get the value from select element
let selectedValue = typingGameCategory.value;

// hide the typing game stage
btnHide.addEventListener('click', function () {
  // toggle hide-stage on typingGameStage element
  typingGameStage.classList.toggle('hide-stage');
});

// typing words array
const wordsArr = [
  'dependent',
  'ronaldo',
  'ronaldinho',
  'macbook',
  'technology',
  'computer science',
  'califonia',
  'usa',
  'nigeria',
];

// get the random number
const randomNumber = Math.floor(Math.random() * wordsArr.length);

// use the random number to select a word from the words array
let word = wordsArr[randomNumber];

// set the word get from the wordsArr array to the typinGameWord element
typingGameWord.textContent = word;

// focus the form input when the page load
formInput.focus();

// format time
const formatTime = function (time) {
  // format the time to min
  let min = time < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60);

  //  format the time to sec
  let sec = time < 10 ? `0${time % 60}` : time % 60;

  // set the min and sec as text into countDownTimer element
  countDownTimer.textContent = `${min}:${sec}s`;
};

// regenerate the random words
const regenerateRandomWord = function () {
  // regenerate the random words
  word = wordsArr[Math.floor(Math.random() * wordsArr.length)];

  // set the word been generated to the typingGameWord element
  typingGameWord.textContent = word;
};

// set counter into score and highScore element
const setCounter = function (count) {
  // set count into score element
  score.textContent = count;

  // set count into highScore element
  highScore.textContent = count;
};

// countDownTimeout function
const countDownTimeout = function () {
  // decrease the timer
  timer--;

  //  format the timer
  formatTime(timer);

  //  if the timer is less than zero clear the time interval and manipulate the cardFront and cardBack element
  if (timer < 0) {
    // clear the time
    clearInterval(timeInterval);

    // add hidden class to cardFront element
    cardFront.classList.add('hidden');

    // remove hidden class to cardBack element
    cardBack.classList.remove('hidden');
  }
};

// add click event to btnReload
btnReload.addEventListener('click', function () {
  // add hidden class to cardBack element
  cardBack.classList.add('hidden');

  //  remove hidden class to cardFront
  cardFront.classList.remove('hidden');

  //  re-assign 10 to timer variable
  timer = 10;

  //  reformat time
  formatTime(timer);

  //  pass the setInterval function to a variable
  timeInterval = setInterval(countDownTimeout, 1000);

  //  if the timer is equals to zero clear the count down time in timeInterval variable
  if (timer < 0) {
    clearInterval(timeInterval);
  }

  // execute the regenerateRandomWord function to select a word from wordArr  arrays
  regenerateRandomWord();

  //  set the counter variable to zero
  counter = 0;

  // pass counter variable as an argument into setCounter function in order to set it as text  in score and highScore element
  setCounter(counter);

  //  set the input field to an empty string
  formInput.value = '';

  //  focus the input element
  formInput.focus();
});

const typingGameDetailsFunc = function () {
  // get the user input
  const inputValue = formInput.value;

  //   check if the user input is equals to the random word that is been generated
  if (inputValue === word) {
    // set the input field into an empty string
    formInput.value = '';

    // execute the regenerateRandomWord function to select a word from wordArr  arrays
    regenerateRandomWord();

    // increase the counter variable
    counter++;

    // pass counter variable as an argument into setCounter function in order to set it as text  in score and highScore element
    setCounter(counter);

    // check if the selectedValue is either easy, medium and hard
    switch (selectedValue) {
      // if the selectedValue is easy add 10 to the timer
      case 'easy':
        timer = timer + 10;
        break;

      // if the selectedValue is medium add 7 to the timer
      case 'medium':
        timer = timer + 7;
        break;

      // if the selectedValue is hard add 3 to the timer
      case 'hard':
        timer = timer + 3;
        break;

      // if the selectedValue is not easy, medium or hard it should break
      default:
        break;
    }
  }
};

// add input event on formInput element and pass typingGameDetailsFunc as a call back function into add event listener method
formInput.addEventListener('input', typingGameDetailsFunc);

// add change event on typinGameCategory element
typingGameCategory.addEventListener('change', function (e) {
  // when there is change in select element store the selectIndex number in selectedIndexCategory element
  selectedIndexCategory = e.target.selectedIndex;

  //  set the selectedIndexCategory element into local storage
  localStorage.setItem('index', selectedIndexCategory);

  //  re-assign the value of the selected options element into selectedValue element
  selectedValue = e.target.value;
});

// init function will be called immediately when the page loads
const init = function () {
  // get the index number from the local storage and convert it to number
  const selectedIndexStorage = +localStorage.getItem('index');

  //   check if the selectedIndexStorage is not null
  if (selectedIndexStorage !== null) {
    // set the index number getting from local storage to the typingDameCategory.selectIndex element
    typingGameCategory.selectedIndex = selectedIndexStorage;

    // re-assign the value getting from select element to selectedValue element
    selectedValue = typingGameCategory.value;
  }

  //  pass the setInterval function into a variable in order to be able to clear the time
  timeInterval = setInterval(countDownTimeout, 1000);
};

init();
