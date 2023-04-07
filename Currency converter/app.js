'use strict';

// select element
const currencyForm = document.querySelector('.currency');
const amount = document.querySelector('.currency__input--amount');
const amountFrom = document.querySelector('.currency__input--from');
const amountTo = document.querySelector('.currency__input--to');
const currencyResult = document.querySelector('.currency__result');
const currencyInput = document.querySelectorAll('.currency__input');

const renderResult = async function () {
  try {
    // 1) get input value from the user
    const amountValue = amount.value;
    const amountFromValue = amountFrom.value;
    const amountToValue = amountTo.value;
    currencyResult.textContent = 'Getting Exchange Rate...';

    console.log(amountValue, amountFromValue, amountToValue);
    // 2) call the exchange rate api and pass the user value to the api
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'kb764hHCD3XOVn38RjdgBnH5KTDWxzIb');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${amountToValue}&from=${amountFromValue}&amount=${amountValue}`,
      requestOptions
    );

    // 3) if the value is not found, it should throw an error
    if (!res.ok)
      throw new Error(`Your query is not found (staus code ${res.status})`);

    // 4) convert the api response to json frmat
    const data = await res.json();

    // 5) render the result to user interface
    currencyResult.textContent = `${amountValue} ${amountFromValue} = ${data.result} ${amountToValue}`;
  } catch (e) {
    // set error message to currency result
    currencyResult.textContent = `${e.message}`;
  }
};

//
currencyForm.addEventListener('submit', function (e) {
  // prevent page from loading when the form is submit
  e.preventDefault();
  // execute the renderResult function
  renderResult();
});

// create a success message function
const renderSuccess = function (input) {
  // 1) select the parent element of the input
  const currencyControl = input.parentElement;
  // 2) select the svg elemet of the input
  const svg = currencyControl.querySelector('svg');
  // 3) insert the success icon into the svg element
  svg.innerHTML = `
    <use xlink:href="img/icons.svg#icon-checkmark"></use>
  `;
  // 4) add and remove class
  input.classList.add('input-success');
  svg.classList.add('icon-success');
  input.classList.remove('input-error');
  svg.classList.remove('icon-error');
  // 5) select the pseudo element and reset the border property
  document.querySelector('.currency__input:focus').style.border =
    '1px solid green';
};

const renderError = function (input) {
  // 1) select the parent element of the input
  const currencyControl = input.parentElement;
  // 2) select the svg elemet of the input
  const svg = currencyControl.querySelector('svg');
  // 3) insert the success icon into the svg element
  svg.innerHTML = `
        <use xlink:href="img/icons.svg#icon-error_outline"></use>
    `;
  // 4) add and remove class
  input.classList.remove('input-success');
  svg.classList.remove('icon-success');
  input.classList.add('input-error');
  svg.classList.add('icon-error');
  // 5) select the pseudo element and reset the border property
  document.querySelector('.currency__input:focus').style.border =
    '1px solid red';
};

// set input event on each input element
currencyInput.forEach(input => {
  input.addEventListener('input', function () {
    // if the value passed in is not empty string renderSuccess function or renderError function
    if (input.value !== '') {
      renderSuccess(input);
    } else {
      renderError(input);
    }
  });
});
