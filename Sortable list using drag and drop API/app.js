+-'use strict';

// select element
const sortList = document.querySelector('.sort__list');
const btnCheck = document.querySelector('.btn--check');

const richestPeople = [
  'Bernard Arnault',
  'Elon Musk',
  'Jeff Bezos',
  'Larry Ellison',
  'Warren Buffett',
  'Bill Gates',
  'Michael Bloomberg',
  'Carlos Slim Helu',
  'Mukesh Ambani',
  'Steve Ballmer',
];

// listItems array will be used
const sortItemsArray = [];

// let initialize the dradStartIndex for us to able to select the sortItem that we drag
let dragStartIndex;

// add event on both the sortItem and sortName element
const addEventListnersOnSortNameAndSortItem = function () {
  // select eleemnt
  const sortNames = document.querySelectorAll('.sort__name');
  const sortItems = document.querySelectorAll('.sort__item');

  // loop both sortNames and sortItems to add eventlistners
  sortNames.forEach(sortName => {
    // add dragstart event on sortName
    sortName.addEventListener('dragstart', function (e) {
      // get the data-index attribute and store it in dragstartindex variable, we have to select sortItem element by closest method and convert to number.
      dragStartIndex = +e.target.closest('.sort__item').dataset.index;

      // add dragging class on the sort name element
      e.target.classList.add('dragging');
    });

    // add dragend event on sortName
    sortName.addEventListener('dragend', e => {
      // remove dragging class on the sort name element
      e.target.classList.remove('dragging');
    });
  });

  sortItems.forEach(sortItem => {
    // add drag over on sortItem element
    sortItem.addEventListener('dragover', e => {
      // we have to prevent default on the sortItem element, to make the drop event to work
      e.preventDefault();
    });

    // add drag enter on sortItem element
    sortItem.addEventListener('dragenter', function () {
      // add drag-over class on the sort item
      this.classList.add('drag-over');
    });

    // add drag leave on sortItem element
    sortItem.addEventListener('dragleave', function () {
      // remove drag-over class on the sort item
      this.classList.remove('drag-over');
    });

    // add drag drop on sortItem element
    sortItem.addEventListener('drop', function () {
      // remove drag-over class on the sort item
      this.classList.remove('drag-over');

      // let get the data-index attribute and store it in a variable
      const dragEndIndex = +this.dataset.index;

      // select the sortName element
      const sortItemOne =
        sortItemsArray[dragStartIndex].querySelector('.sort__name');
      const sortItemTwo =
        sortItemsArray[dragEndIndex].querySelector('.sort__name');

      // swap the sortName element in the sortItem element
      sortItemsArray[dragStartIndex].append(sortItemTwo);
      sortItemsArray[dragEndIndex].append(sortItemOne);
    });
  });
};

// create the list item
const renderSortItem = function () {
  // let make a copy of the richest people array
  [...richestPeople]
    // disorder the richest people list everytime we refresh the browser and create an object for each of the richest people
    .map(person => {
      return { value: person, sort: Math.random() };
    })
    // sort the person object based on the sort value
    .sort((a, b) => a.sort - b.sort)
    // we have to return the value from the object, for us to be able to create li element for each of the person
    .map(person => person.value)
    // for each of the richest people, we want to create list item
    .forEach((person, index) => {
      // create li element
      const sortItem = document.createElement('li');

      // add sort list class to the li element
      sortItem.classList.add('sort__item');

      // set a data-index attributes on the sortItem element
      sortItem.setAttribute('data-index', `${index}`);

      // insert some html markup into sortItem element
      sortItem.innerHTML = `
        <p class="sort__index">${index + 1}</p>
        <p class="sort__name" draggable="true">${person}</p>
    `;

      // push the sortItem element into sortItemsArray
      sortItemsArray.push(sortItem);

      // append sortItem element to sortList element
      sortList.append(sortItem);
    });

  // execute addEventListners function
  addEventListnersOnSortNameAndSortItem();
};

renderSortItem();

// check if the sortItem are in correct order
btnCheck.addEventListener('click', function () {
  // select all sortName
  const sortNames = document.querySelectorAll('.sort__name');

  // loop through sortNames to check if the name are in correct order
  sortNames.forEach((sortName, index) => {
    // store sortName content in a variable
    const person = sortName.textContent;

    // check if the person is not equal richest people value
    if (person !== richestPeople[index]) {
      // add wrong-order class to the current sortName element
      sortName.classList.add('wrong-order');

      // remove right-order class to the current sortName element
      sortName.classList.remove('right-order');
    } else {
      // add right-order class to the current sortName element
      sortName.classList.add('right-order');

      // remove wrong-order class to the current sortName element
      sortName.classList.remove('wrong-order');
    }
  });
});
