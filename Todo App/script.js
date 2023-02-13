"use strict";

// Selecting element
const username = document.querySelector(".todo-app__title-name");
const btnChange = document.querySelector(".btn--change");
const backgroundImage = document.querySelector(".background-image");
const container = document.querySelector(".container");
const todoAppSearch = document.querySelector(".todo-app__search");
const todoAppSearchInput = document.querySelector(".todo-app__search-input");
const todoAppList = document.querySelector(".todo-app__list");
const footer = document.querySelector(".footer");
const footerLink = document.querySelector(".footer__link");
const radioGroup = document.getElementsByName("radio");
const todoAppItemLeft = document.querySelector(".todo-app__item-left");

// Select buttons
const btnAll = document.querySelector(".btn--all");
const btnCompleted = document.querySelector(".btn--complete");
const btnUncompleted = document.querySelector(".btn--uncompleted");

// item left
const itemLeftArr = [];

// items
let items = [];

// username array
let todoAppInputValueArr = [];

// get user input from contenteditable element
username.addEventListener("blur", function () {
  const text = this.textContent;
  localStorage.setItem("username", text);
});

// set userName textContent to empty when focus and set the color to white
username.addEventListener("focus", function () {
  this.textContent = "";
  this.style.color = "#fff";
});

// change the background image and color of the text also change background color
btnChange.addEventListener("click", function () {
  // toggling rotate class
  this.classList.toggle("rotate");

  // inserting html markup to the UI
  const markUp = `
        <svg class="todo-app__title-icon icon">
            <use xlink:href="img/icons.svg#icon-${
              this.classList.contains("rotate") ? "moon" : "brightness-up"
            }"></use>
        </svg>
    `;

  this.innerHTML = "";
  this.insertAdjacentHTML("afterbegin", markUp);

  // change element
  if (this.classList.contains("rotate")) {
    backgroundImage.style.backgroundImage = "url(img/bg-desktop-light.jpg)";
    container.style.backgroundColor = "#fff";
    footer.style.color = "rgb(14, 4, 17)";
    footerLink.style.color = "rgb(14, 4, 17)";
  } else {
    backgroundImage.style.backgroundImage = "url(img/bg-desktop-dark.jpg)";
    container.style.backgroundColor = "rgb(14, 4, 17)";
    footer.style.color = "#fff";
    footerLink.style.color = "#ffffff7d";
  }
});

// checking if the radio button is checked to know if the value if business or personal
const checkRadioForBusinOrPersonal = function () {
  Array.from(radioGroup).forEach((el) => {
    if (el.checked && el.value === "business") {
      document.querySelector(".todo-app__radio-btn").style.backgroundImage =
        "linear-gradient(to right bottom, var(--color-secondary-dark),var(--color-secondary-light))";
    }

    if (el.checked && el.value === "personal") {
      document.querySelector(".todo-app__radio-btn").style.backgroundImage =
        "linear-gradient(to right bottom, #d3c7c3, #918581)";
    }
    el.checked = false;
  });
};

// to check radio button programatically
let num = 0;

// create html markup
todoAppSearch.addEventListener("submit", function (e) {
  num++;
  localStorage.setItem("number", num);
  e.preventDefault();

  // check for empty string
  if (!todoAppSearchInput.value) return;

  // check for white space in todoAppSearchInput
  if (/^\s/.test(todoAppSearchInput.value)) {
    todoAppSearchInput.value = "";
    return;
  }

  console.log(todoAppSearchInput.value.includes(" "));
  const markUp = `
        <li  class="todo-app__item">
            <label for="radio-item--${num}" class="todo-app__label-btn">
            <input
                type="radio"
                name= "radio-item--${num}"
                id="radio-item--${num}"
                class="todo-app__radio"
                value = "radio-item--${num}"
            />
            <span class="todo-app__radio-btn">
                <svg class="todo-app__radio-icon icon">
                <use xlink:href="img/icons.svg#icon-check"></use>
                </svg>
            </span>
            </label>
            <textarea  class="todo-app__input-value" ></textarea>
            <div class="btn__container">
            <button class="btn btn--edit">edit</button>
            <button class="btn btn--delete">delete</button>
            </div>
        </li>
    `;
  todoAppList.insertAdjacentHTML("afterbegin", markUp);

  // select element
  const todoAppInputValue = document.querySelector(".todo-app__input-value");
  const todoAppItem = document.querySelector(".todo-app__item");
  const btnEdit = document.querySelector(".btn--edit");
  const btnDelete = document.querySelector(".btn--delete");
  const todoAppLabelBtn = document.querySelector(".todo-app__label-btn");
  const radioItem = document.getElementsByName(`radio-item--${num}`);

  // push radioItem to itemLeftArr
  itemLeftArr.push(...radioItem);

  // push html markup to item array
  items.push(markUp);

  // set items arr to local storage
  localStorage.setItem("item", JSON.stringify(items));

  // set todoAppSearchInput value to todoAppInputValue value
  todoAppInputValue.value = todoAppSearchInput.value;

  // push todoAppInputValue value to usernameArr array
  todoAppInputValueArr.push(todoAppInputValue.value);

  localStorage.setItem("inputValue", JSON.stringify(todoAppInputValueArr));

  // disable todoAppInputValue
  todoAppInputValue.disabled = "true";

  // set todoAppSearchInput to empty string
  todoAppSearchInput.value = "";

  // todoAppSearchInput should not be focus when the form is submitted
  todoAppSearchInput.blur();

  // excute checkRadioForBusinOrPersonal()
  checkRadioForBusinOrPersonal();

  // add strike to text
  todoAppLabelBtn.addEventListener("click", function () {
    Array.from(radioItem).forEach((el) => {
      if (el.checked) {
        todoAppInputValue.classList.add("checked");
        const index = itemLeftArr.findIndex((val) => val.value === el.value);
        itemLeftArr.splice(index, 1);
        todoAppItemLeft.textContent = itemLeftArr.length;
        console.log(itemLeftArr);
      }
    });
  });

  // edit text in todoAppInputValue
  btnEdit.addEventListener("click", function () {
    todoAppInputValue.style.cursor = "auto";
    todoAppInputValue.removeAttribute("disabled");
  });

  // delete todoAppItem element
  btnDelete.addEventListener("click", function () {
    todoAppItem.remove();
  });

  // check for completed task
  btnCompleted.addEventListener("click", function () {
    if (!todoAppInputValue.classList.contains("checked")) {
      todoAppInputValue.parentElement.style.display = "none";
    }
  });

  // check for uncompleted task
  btnUncompleted.addEventListener("click", function () {
    if (todoAppInputValue.classList.contains("checked")) {
      todoAppInputValue.parentElement.style.display = "none";
    }
  });

  // display all the task
  btnAll.addEventListener("click", function () {
    todoAppInputValue.parentElement.style.display = "flex";
  });

  // set
  todoAppItemLeft.textContent = itemLeftArr.length;
});

// get username from local storage
const getUsernameFromLocalStorage = function () {
  // get username from localstorage
  const usernameStorage = localStorage.getItem("username");

  // return immediately if the localstorage is empty
  if (!usernameStorage) return;

  username.textContent = usernameStorage;
};

// get item from local storage
const getItemsFromLocalStorage = function () {
  // get item from localstorage
  const itemStorage = localStorage.getItem("item");

  // return immediately if the localstorage is empty
  if (!itemStorage) return;

  // converting itemstorage to array of object
  const itemArr = JSON.parse(itemStorage);

  // passing itemArr from localstorage to items array
  items = itemArr;
  console.log(items.join(""));

  // inserting items to dom
  todoAppList.insertAdjacentHTML("beforeend", items.join(""));

  let numm = localStorage.getItem("number");
  num = numm;
  const todoAppInputValueAll = document.querySelectorAll(
    ".todo-app__input-value"
  );
  const todoAppItemAll = document.querySelectorAll(".todo-app__item");
  const btnEditAll = document.querySelectorAll(".btn--edit");
  const btnDeleteAll = document.querySelectorAll(".btn--delete");
  const todoAppLabelBtnAll = document.querySelectorAll(".todo-app__label-btn");
  const radioItemAll = document.getElementsByName(`radio-item--${num}`);

  // get inputValue from local storage
  const getTodoAppInputValue = function () {
    const inputValueStorage = localStorage.getItem("inputValue");

    if (!inputValueStorage) return;

    const inputValue = JSON.parse(inputValueStorage);

    todoAppInputValueArr = inputValue;

    todoAppInputValueArr.forEach((val, i) => {
      const todoAppInputValue = todoAppInputValueAll[i];
      todoAppInputValue.value = val;
      todoAppInputValue.disabled = "true";
    });
  };
  getTodoAppInputValue();

  // btn edit
  btnEditAll.forEach((btn) => {});
};

window.addEventListener("load", function () {
  console.log("hello");
  //  execute getUsernameFromLocalStorage function
  getUsernameFromLocalStorage();

  //  execute getItemsFromLocalStorage function
  getItemsFromLocalStorage();

  //  execute getTodoAppInputValue function
  // getTodoAppInputValue();
});
