'use strict';

// select element
const section1El = document.querySelector('.section--1');
const section2El = document.querySelector('.section--2');
const cardContainer = document.querySelector('.card__container');
const cardPagination = document.querySelector('.card__pagination');
const questionTextArea = document.querySelector('.memory-card__question-text');
const answerTextArea = document.querySelector('.memory-card__answer-text');

// button element
const btnAddNewCard = document.querySelector('.btn--add-new-card');
const btnArrowLeft = document.querySelector('.btn--arrow-left');
const btnArrowRight = document.querySelector('.btn--arrow-right');
const btnDelete = document.querySelector('.btn--delete');
const btnClose = document.querySelector('.btn--close');
const btnAddCard = document.querySelector('.btn--add-card');
const btnClearCard = document.querySelector('.btn--clear');

// state variable
let currentCard = 0;

// get the card content from local storage or get empty array
const cardArray = JSON.parse(localStorage.getItem('card')) || [];

// add click event on btnAddNewCard element
btnAddNewCard.addEventListener('click', function () {
  // add hidden class to section--1 element
  section1El.classList.add('hidden');
  // remove hidden class to section--2 element
  section2El.classList.remove('hidden');
  // change the background color of body element to aqua color
  document.body.style.backgroundColor = '#f0f0f0';
});

// hide section2 function
const hideSection2Function = function () {
  // remove hidden class to section--1 element
  section1El.classList.remove('hidden');
  // add hidden class to section--2 element
  section2El.classList.add('hidden');
  // change the background color of body element to white color
  document.body.style.backgroundColor = '#fff';
};

// add click event on btnClose button
btnClose.addEventListener('click', hideSection2Function);

// display the current card and length of the card in user interface
const renderCardPagination = function () {
  cardPagination.textContent = `${currentCard + 1}/${cardArray.length}`;
};

// add click event on btnAddCard button
btnAddCard.addEventListener('click', function () {
  // store the user input in a variable
  const questionValue = questionTextArea.value;
  const answerValue = answerTextArea.value;

  // check if both questionTextArea value and answerTextArea value is not a empty string
  if (questionValue === '' || answerValue === '') return;

  // check if the user input number to both textarea
  if (isFinite(questionValue) || isFinite(answerValue)) return;

  // create an object the contain both answer value and question value as it value, push it into the card array
  cardArray.push({
    questionValue,
    answerValue,
  });

  // set the card array to local storage
  localStorage.setItem('card', JSON.stringify(cardArray));

  // set the value of both answerTextArea value and questionTextArea value to empty string
  questionTextArea.value = answerTextArea.value = '';

  // execute createCardMarkupHtml function
  createCardMarkupHtml();

  // execute hideSection2Function function
  hideSection2Function();
});

// create card markup html function
const createCardMarkupHtml = function () {
  // loop through card array to create html string
  cardArray.forEach(card => {
    const markup = `
      <div class="card__content">
        <article class="card__details card__front">
          <p class="card__flip">
            <svg class="icon card__icon">
              <use xlink:href="icons/icons.svg#icon-flip"></use>
            </svg>
            Flip
          </p>
          <p class="card__text card__question">${card.questionValue}</p>
        </article>
        <article class="card__details card__back">
          <p class="card__flip">
            <svg class="icon card__icon">
              <use xlink:href="icons/icons.svg#icon-flip"></use>
            </svg>
            Flip
          </p>
          <p class="card__text card__answer">
            ${card.answerValue}
          </p>
        </article>
      </div>
    `;
    // insert to the cardContainer element
    cardContainer.insertAdjacentHTML('afterbegin', markup);
  });

  // select all card element
  const cardContents = document.querySelectorAll('.card__content');
  const cardFonts = document.querySelectorAll('.card__front');
  const cardBacks = document.querySelectorAll('.card__back');

  // loop through cardContents to translate them side by side
  cardContents.forEach((cardContent, i) => {
    cardContent.style.transform = `translateX(${(i - currentCard) * 100}%)`;
  });

  // loop through cardContents, add click event on each of the cardContet
  cardContents.forEach((cardContent, i) => {
    const cardFront = cardFonts[i];
    const cardBack = cardBacks[i];
    cardContent.addEventListener('click', () => {
      // toggle card-front-hidden class on cardFront element
      cardFront.classList.toggle('card-front-hidden');

      // toggle card-back-hidden class on cardBack element
      cardBack.classList.toggle('card-back-hidden');
    });
  });

  // if the array length is less than zero i want it return immediately
  if (cardArray.length < 1) return;

  // execute cardPagination function when the page load
  renderCardPagination();
};

createCardMarkupHtml();

// goto slide function
const gotoSlide = function (count) {
  const cardContents = document.querySelectorAll('.card__content');
  // loop through cardContents to translate them side by side
  cardContents.forEach((cardContent, i) => {
    cardContent.style.transform = `translateX(${(i - count) * 100}%)`;
  });
};

// add click event on arrowRight btn
btnArrowRight.addEventListener('click', function () {
  // if the array length is less than zero i want it return immediately
  if (cardArray.length < 1) return;

  // when arrow right buttton is click display the arrow left if the display property is set to none
  btnArrowLeft.style.display = 'block';

  // increase the current card number by one
  currentCard++;

  // if the currentCard is greater than or equal to cardArray length minus 1
  if (currentCard >= cardArray.length - 1) {
    // if the condition is met set the current card variable to cardArray.length -1
    currentCard = cardArray.length - 1;

    // hide the btnArrowRight
    btnArrowRight.style.display = 'none';
  }

  // execute the goto slide function to move to next card
  gotoSlide(currentCard);

  // execute cardPagination function when the page load
  renderCardPagination();
});

// add click event on arrowLeft btn
btnArrowLeft.addEventListener('click', function () {
  // if the array length is less than zero i want it return immediately
  if (cardArray.length < 1) return;

  // when arrow left buttton is click display the arrow right if the display property is set to none
  btnArrowRight.style.display = 'block';

  // decrease the current card number by one
  currentCard--;

  // if the currentCard is less than or equal to 0
  if (currentCard <= 0) {
    // if the condition is met set the current card variable to 0
    currentCard = 0;

    // hide the btnArrowLeft
    btnArrowLeft.style.display = 'none';
  }

  // execute the goto slide function to move to next card
  gotoSlide(currentCard);

  // execute cardPagination function when the page load
  renderCardPagination();
});

// clear the local storage and reload the browser
btnClearCard.addEventListener('click', function () {
  // clear the local storage
  localStorage.clear();

  // reload the browser
  location.reload();

  // set empty string to card pagination
  cardPagination.textContent = '';
});
