'use strict';

// Selecting element
const username = document.querySelector('.todo-app__title-name');
const btnChange = document.querySelector('.btn--change');
const backgroundImage = document.querySelector('.background-image');
const container = document.querySelector('.container');
const todoAppForm = document.querySelector('.todo-app__form');
const todoAppSearchInput = document.querySelector('.todo-app__search-input');
const todoAppList = document.querySelector('.todo-app__list');
const footer = document.querySelector('.footer');
const footerLink = document.querySelector('.footer__link');
const todoAppItemLeft = document.querySelector('.todo-app__item-left');
const todoAppAction = document.querySelector('.todo-app__actions');
const btnSort = document.querySelector('.btn--sort');

// change the background image and color of the text also change background color
btnChange.addEventListener('click', function () {
  // toggling rotate class
  this.classList.toggle('rotate');

  // inserting html markup to the UI
  const markUp = `
        <svg class="todo-app__title-icon icon">
            <use xlink:href="img/icons.svg#icon-${
              this.classList.contains('rotate') ? 'moon' : 'brightness-up'
            }"></use>
        </svg>
    `;

  this.innerHTML = '';
  this.insertAdjacentHTML('afterbegin', markUp);

  // change element
  if (this.classList.contains('rotate')) {
    backgroundImage.style.backgroundImage = 'url(img/bg-desktop-light.jpg)';
    container.style.backgroundColor = '#fff';
    footer.style.color = 'rgb(14, 4, 17)';
    footerLink.style.color = 'rgb(14, 4, 17)';
  } else {
    backgroundImage.style.backgroundImage = 'url(img/bg-desktop-dark.jpg)';
    container.style.backgroundColor = 'rgb(14, 4, 17)';
    footer.style.color = '#fff';
    footerLink.style.color = '#ffffff7d';
  }
});

// select item that does not contains checked class
const selectItemNotChecked = function () {
  // select all item that are not checked
  const itemNotChecked = document.querySelectorAll(
    '.todo-app__input-value:not(.checked)'
  );

  // set todos length to todoAppItemLeftNum
  todoAppItemLeft.textContent = itemNotChecked.length;
};

// set todos to local storage dynamically
let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('load', function (e) {
  // get username value from local storgae
  username.value = localStorage.getItem('username') || '';

  // set username value to local storage when there is a change in value
  username.addEventListener('change', function (e) {
    localStorage.setItem('username', e.target.value);
  });

  // add event to form
  todoAppForm.addEventListener('submit', function (e) {
    // prevent form from submitting
    e.preventDefault();

    // check if there input is empty string
    if (!todoAppSearchInput.value) return;

    // check if there is space inside the input field
    if (/^\s/.test(todoAppSearchInput.value)) {
      todoAppSearchInput.value = '';
      return;
    }

    // save user input and radio button value to todo object
    const todo = {
      searchValue: e.target.searchValue.value,
      radioValue: e.target.elements.radio.value,
      checked: false,
    };

    // push todo object to local storage
    todos.push(todo);

    // set todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // render todo list element to user interface
    renderTodoList();

    // execute selectItemNotChecked function
    selectItemNotChecked();

    // reset the form
    e.target.reset();
  });

  // render todo list when the page load
  renderTodoList();

  // execute selectItemNotChecked function
  selectItemNotChecked();
});

const renderTodoList = function (sorted = false) {
  // set the todoAppList to empty string
  todoAppList.innerHTML = '';

  // sort todos
  const todosSort = sorted
    ? todos.slice().sort((a, b) => {
        if (a.searchValue > b.searchValue) return 1;
        if (a.searchValue < b.searchValue) return -1;
      })
    : todos;

  todosSort.forEach(todo => {
    // create element
    const todoAppItem = document.createElement('li');
    const label = document.createElement('label');
    const inputCheckedBox = document.createElement('input');
    const span = document.createElement('span');
    const textarea = document.createElement('textarea');
    const btnContainer = document.createElement('div');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');

    // add class to element
    todoAppItem.classList.add('todo-app__item');
    label.classList.add('todo-app__label-btn');
    inputCheckedBox.classList.add('todo-app__checkbox');
    span.classList.add('todo-app__checkbox-btn');
    textarea.classList.add('todo-app__input-value');
    btnContainer.classList.add('btn__container');
    btnEdit.classList.add('btn', 'btn--edit');
    btnDelete.classList.add('btn', 'btn--delete');

    // create an element inside another element
    inputCheckedBox.type = 'checkbox';
    inputCheckedBox.checked = todo.checked;
    inputCheckedBox.setAttribute('name', 'checkbox-item');
    inputCheckedBox.setAttribute('id', 'checkbox-item');
    span.innerHTML = `
      <svg class="todo-app__checkbox-icon icon">
        <use xlink:href="img/icons.svg#icon-check"></use>
      </svg>
    `;
    textarea.disabled = 'true';
    textarea.value = todo.searchValue;
    btnEdit.textContent = 'Edit';
    btnDelete.textContent = 'Delete';

    // append element
    label.append(inputCheckedBox);
    label.append(span);
    btnContainer.append(btnEdit);
    btnContainer.append(btnDelete);
    todoAppItem.append(label);
    todoAppItem.append(textarea);
    todoAppItem.append(btnContainer);
    todoAppList.append(todoAppItem);

    // add click event on label
    label.addEventListener('click', function () {
      // execute selectItemNotChecked function
      selectItemNotChecked();
    });

    // add event to edit button
    btnEdit.addEventListener('click', function (e) {
      // 1) remove disabled attribute from textarea
      textarea.removeAttribute('disabled');

      // 2) set cursor to auto
      textarea.style.cursor = 'auto';

      // 3) set focus on textarea
      if (e.target) {
        textarea.focus();
      }
      // 4) add event to textarea to resave the value to local storage and add disabled attribute, set cursor to not-allowed
      textarea.addEventListener('blur', function (e) {
        // set attributes disabled to true on textarea
        textarea.disabled = 'true';
        // set cursor to not-allowed
        textarea.style.cursor = 'not-allowed';
        // set the value in textarea to local storage
        todo.searchValue = e.target.value;
        // restore the localstorage
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    });

    // add event of delete btn
    btnDelete.addEventListener('click', function () {
      // remove item from dom
      todoAppItem.remove();

      // execute selectItemNotChecked function
      selectItemNotChecked();

      // get index number of item from todos array
      const index = todos.findIndex(el => textarea.value === el.searchValue);

      // delete item from todos array
      todos.splice(index, 1);

      // restore local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    });

    // add personal class to element that have personal value
    if (todo.radioValue === 'personal') {
      span.classList.add('personal');
    }

    // add business class to element that have business value
    if (todo.radioValue === 'business') {
      span.classList.add('business');
    }

    // add checked class to textarea when the inputCheckbox is true and remove it when false
    if (todo.checked) {
      textarea.classList.add('checked');
    } else {
      textarea.classList.remove('checked');
    }

    // add class checked to inputChecked when checked
    inputCheckedBox.addEventListener('click', function (e) {
      // set todo.checked to true
      todo.checked = e.target.checked;

      // check if the todo.checked is true
      if (todo.checked) {
        // add checked class to textarea
        textarea.classList.add('checked');
      } else {
        // remove checked class todo.checked is false
        textarea.classList.remove('checked');
      }

      // restore todos to local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    });

    // add event listners on todoapp actions
    todoAppAction.addEventListener('click', function (e) {
      switch (e.target.classList[1]) {
        case 'btn--all':
          todoAppItem.style.display = 'flex';
          break;

        case 'btn--completed':
          if (textarea.classList.contains('checked')) {
            todoAppItem.style.display = 'flex';
          } else {
            todoAppItem.style.display = 'none';
          }
          break;

        case 'btn--uncompleted':
          if (!textarea.classList.contains('checked')) {
            todoAppItem.style.display = 'flex';
          } else {
            todoAppItem.style.display = 'none';
          }
          break;
      }
    });
  });

  return todosSort;
};

// state variable to change the state of todos
let sorted = false;

// add event on btnSort
btnSort.addEventListener('click', function () {
  // store the todos array in a variable
  const todosArr = renderTodoList(!sorted);
  // check if the array length is greater than 0
  if (todosArr.length > 0) {
    // manipulate sorted variable to true or false
    sorted = !sorted;
  }
  // return the array
  return todosArr;
});
