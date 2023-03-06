'use strict';

// select element
const movieItems = document.querySelector('.movie__items');
const movieSeatContainer = document.querySelector('.movie__seat-container');
const movieSeatNumber = document.querySelector('.movie__seat--number');
const movieSeatPrice = document.querySelector('.movie__seat--price');
const btnEmptyAll = document.querySelectorAll('.btn--empty');

// select movieItems index
let movieItemIndex = movieItems.selectedIndex;

// get movieItems value
let movieItemsValue = +movieItems.value;

// updata the movie seat number and movie seat price
const renderSeatNumberAndPrice = function () {
  // select all element that has movie__seat-selected class
  const seatSelected = document.querySelectorAll(
    '.btn--empty.movie__seat--selected'
  );
  // get index number of the seat selected
  const seatIndex = [...seatSelected].map(seat =>
    [...btnEmptyAll].indexOf(seat)
  );
  // set seatIndex to local storage
  localStorage.setItem('seatIndex', JSON.stringify(seatIndex));
  // store the length of seat selected
  const seatCount = seatSelected.length;
  // set movieSeatumber to selected seat lenght
  movieSeatNumber.textContent = seatCount;
  // to get movieSeatPrice = seat selected length * movie items value
  movieSeatPrice.textContent = seatCount * movieItemsValue;
};

// add change event on movieItems
movieItems.addEventListener('change', function (e) {
  // get movieItems value when event change is fire
  movieItemsValue = +e.target.value;
  // set movieItemsValue to local storage
  localStorage.setItem('movieItemsValue', movieItemsValue);
  // get movieItems Index
  movieItemIndex = e.target.selectedIndex;
  // set movieItems index to local storage
  localStorage.setItem('movieItemIndex', movieItemIndex);

  renderSeatNumberAndPrice();
});

// add event on movieSeatContainer, select btn--empty use event delegation
movieSeatContainer.addEventListener('click', function (e) {
  if (e.target.classList[3] === 'btn--empty') {
    // remove and add movie__seat--selected class when click on btn--empty
    e.target.classList.toggle('movie__seat--selected');
    // executing renderSeatNumberAndPrice()
    renderSeatNumberAndPrice();
  }
});

window.addEventListener('load', function () {
  // get seatIndex from local storage
  const seatIndexStorage = JSON.parse(localStorage.getItem('seatIndex'));
  // check if the seatIndex is null or greater than 0
  if (seatIndexStorage !== null && seatIndexStorage.length > 0) {
    // looping through btnEmptyAll
    btnEmptyAll.forEach((seat, index) => {
      // check if btnEmptyAll array has number in seatIndexStorage array as index number
      if (seatIndexStorage.indexOf(index) > -1) {
        // add movie__seat--selected class to element that has the same index number to the number inside seatIndexStorage array
        seat.classList.add('movie__seat--selected');
      }
    });
  }

  // // get movieItemIndex from local storage
  const movieItemIndexStorage = localStorage.getItem('movieItemIndex');
  // check if the seatIndex is null
  if (movieItemIndexStorage !== null) {
    // set movieItems index to the value from local storage
    movieItems.selectedIndex = +movieItemIndexStorage;
  }

  renderSeatNumberAndPrice();
});
