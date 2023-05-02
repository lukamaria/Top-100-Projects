'use strict';

// select element
const btnAddUser = document.querySelector('.btn--add-user');
const btnDoubleMoney = document.querySelector('.btn--double-money');
const btnShowMillionaira = document.querySelector('.btn--millionaira');
const btnSort = document.querySelector('.btn--sort');
const btnTotal = document.querySelector('.btn--total');
const userDetails = document.querySelector('.user__details');

// an array that consist all user details
let userInfoArr = [];

// execute the getRandomUser when the page load
window.addEventListener('load', function () {
  getRandomUser();
  getRandomUser();
  getRandomUser();
});

// format number to string
const numFormat = new Intl.NumberFormat();

// get user detail from an api
const getRandomUser = async function () {
  try {
    // 1) fetch user detail
    const res = await fetch('https://randomuser.me/api/');

    // 2) convert the respond to an object
    const data = await res.json();

    // 3) get the user name from the array and store it in a variable
    const user = `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
    console.log(user);

    // 4) generate random number from 1 t0 1million
    const randomNum = Math.floor(Math.random() * 1000000) + 1;

    // 5) create an object the consist both user detail and number been generated
    const userInfo = { user, money: randomNum };
    console.log(userInfo);

    // 6) push userInfo object to userInfoArr
    userInfoArr.push(userInfo);

    // 7) execute the renderUser
    renderUser();
    console.log(userInfoArr);
  } catch (e) {
    RenderErrorMessage(e.message);
  }
};

// insert error element to the dom
const RenderErrorMessage = function (message) {
  // set userDetails to empty string
  userDetails.innerHTML = '';

  // create the html markup for error message
  const markup = `
    <div class="error">
      <svg class="error__icon">
        <use xlink:href="img/icon.svg#icon-alert-triangle"></use>
      </svg>
      <p class="error__text">${message}</p>
    </div>
  `;

  // insert the element to the dom
  userDetails.insertAdjacentHTML('afterbegin', markup);
};

// when click on btnAddUser add another user to the user interface
btnAddUser.addEventListener('click', function () {
  getRandomUser();
});

// double the amount of the money when click
btnDoubleMoney.addEventListener('click', function () {
  const userMoneyDouble = userInfoArr.map(el => {
    return { user: el.user, money: el.money * 2 };
  });

  // assign the new array to userInfoArr
  userInfoArr = userMoneyDouble;

  // update the user interface
  renderUser();
});

// show only the millionaire when click
btnShowMillionaira.addEventListener('click', function () {
  const millionairaUser = userInfoArr.filter(el => el.money > 1000000);

  // assign the new array to userInfoArr
  userInfoArr = millionairaUser;

  // update the user interface
  renderUser();
});

// state variable to change the array back and forth
let sort;

// sort the user by there money
btnSort.addEventListener('click', function () {
  // execute the renderUser by inverting the sort variable
  renderUser(!sort);

  // reassign the sort variable
  sort = !sort;
});

// calculate the total money
btnTotal.addEventListener('click', function () {
  const balance = userInfoArr.reduce(
    (acc, curValue) => acc + curValue.money,
    0
  );

  // execute the function
  totalElement(balance);
});

// insert the total element to the user interface
const totalElement = function (balance) {
  const markup = `
    <div class="user__value">
      <p class="user__text">Total Wealth</p>
      <h3 class="heading--2">$${numFormat.format(balance)}.00</h3>
    </div>
  `;

  userDetails.insertAdjacentHTML('beforeend', markup);
};

// render all the user details to the user interface
const renderUser = function (sort = false) {
  // 1) set the userDetails to an empty string
  userDetails.innerHTML = '';

  // 2) create a shallow copy of the array
  const userInfoSort = sort
    ? userInfoArr.slice().sort((a, b) => {
        if (a.money > b.money) return 1;
        if (a.money < b.money) return -1;
      })
    : userInfoArr;

  // 3) loop through the userInfoArr and render it to the user interface
  userInfoSort.forEach(el => {
    const markup = `
      <div class="user__data">
        <h2 class="heading--2">${el.user}</h2>
        <p class="user__text">$${numFormat.format(el.money)}.00</p>
      </div>
    `;
    userDetails.insertAdjacentHTML('afterbegin', markup);
  });

  return userInfoSort;
};
