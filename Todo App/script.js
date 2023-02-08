"use strict";

// Selecting element
const nameText = document.querySelector(".todo-app__title-name");

nameText.addEventListener("blur", function () {
  const text = this.textContent;
});
