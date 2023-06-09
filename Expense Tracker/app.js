'use strict';

// select tracker element
const trackerBalanceTotal = document.querySelector('.tracker__balance--total');
const trackerBalanceAccountMoneyIncome = document.querySelector(
  '.tracker__balance__account-money--income'
);
const trackerBalanceAccountMoneyExpense = document.querySelector(
  '.tracker__balance__account-money--expense'
);
const trackerHistoryContent = document.querySelector(
  '.tracker__history-content'
);
const trackerError = document.querySelector('.tracker__error');
const trackerErrorMessage = document.querySelector('.tracker__error-message');

// select form element
const form = document.querySelector('.form');
const formInputItemName = document.querySelector('.form__input__item--name');
const formInputItemAmount = document.querySelector(
  '.form__input__item--amount'
);

// set the data to local storage dynamically
const itemArr = JSON.parse(localStorage.getItem('itemData')) || [];

// clear the time out
const timer = function () {
  setTimeout(() => {
    trackerError.classList.add('hidden');
  }, 3000);
};

// add submit event on form element
form.addEventListener('submit', function (e) {
  // 1) prevent the form from automatically submitting
  e.preventDefault();

  // 2) execute the timer function to hide the error message
  timer();

  // 3) check if the formInputItemName is empty
  if (formInputItemName.value === '') {
    trackerError.classList.remove('hidden');
    trackerErrorMessage.textContent =
      'The item field and amount field must not be empty';
    return;
  }

  // 4) check if the formInputItemName contain number
  if (isFinite(formInputItemName.value)) {
    trackerError.classList.remove('hidden');
    trackerErrorMessage.textContent =
      'The item field must contains alphabet not number';
    return;
  }

  // 5) check if the formInputItemAmount is empty
  if (formInputItemAmount.value === '') {
    trackerError.classList.remove('hidden');
    trackerErrorMessage.textContent =
      'The item field and amount field must not be empty';
    return;
  }

  // 6) set the input data to local storage
  const itemDataObj = {
    inputNameValue: formInputItemName.value,
    inputAmountValue: formInputItemAmount.value,
  };

  // 7) push the item data object to itemArr array
  itemArr.push(itemDataObj);

  // 8) set itemArr  array to locals storage
  localStorage.setItem('itemData', JSON.stringify(itemArr));
  console.log(itemDataObj);

  // 9) render items to the user interface
  renderItem();

  // 10) reset the form
  e.target.reset();
});

const renderItem = function () {
  // 1) empty the trackerHistoryContent element
  trackerHistoryContent.innerHTML = '';

  // 2) loop through the itemArr array to create all element and render it to the user interface
  itemArr.forEach(item => {
    // 3) create element
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const paragraphy1 = document.createElement('p');
    const paragraphy2 = document.createElement('p');

    // 4) add class to the element
    li.classList.add('tracker__history__item');
    btn.classList.add('btn', 'btn--delete');
    paragraphy1.classList.add(
      'tracker__history-text',
      'tracker__history__item-name'
    );
    paragraphy2.classList.add(
      'tracker__history-text',
      'tracker__history__item--income-money'
    );

    // 5) add class to li element dynamically
    if (item.inputAmountValue.includes('-')) {
      li.classList.add('tracker__history__item--expense');
    } else {
      li.classList.add('tracker__history__item--income');
    }

    // 6) create html entity into btn element
    btn.innerHTML = '&times;';

    // 7) set the inputNameValue to paragraphy1
    paragraphy1.innerText = item.inputNameValue;

    // 8) set inputAmountValue dynamically to paragraphy2
    paragraphy2.innerText = item.inputAmountValue.includes('-')
      ? item.inputAmountValue
      : `+${item.inputAmountValue}`;

    // 9) add click event on btn element
    btn.addEventListener('click', function (e) {
      // remove the li element from the dom
      li.remove();

      // get the index of an element that meet the condition inside itemArr array
      const index = itemArr.findIndex(
        el => el.inputNameValue === paragraphy1.textContent
      );

      // delete the element that has the index from itemArr array
      itemArr.splice(index, 1);

      // reset the itemArr array to local storage
      localStorage.setItem('itemData', JSON.stringify(itemArr));

      // render the items to the user interface
      renderItem();
    });

    // 10) append element to their parent element
    li.append(btn);
    li.append(paragraphy1);
    li.append(paragraphy2);
    trackerHistoryContent.append(li);
  });

  // 11) calculate the total income
  const balance = itemArr
    .filter(el => !el.inputAmountValue.includes('-'))
    .reduce((acc, el) => acc + Number(el.inputAmountValue), 0);

  // 12) calculate the expenses balance
  const expenseBalance = itemArr
    .filter(expense => expense.inputAmountValue.includes('-'))
    .reduce((acc, expense) => acc - Number(expense.inputAmountValue), 0);

  // 13) display the total balance to the user interface
  trackerBalanceTotal.textContent =
    `$${balance - expenseBalance}.00` ?? '$0.00';

  // 14) display the income total to the user interface dynamically
  trackerBalanceAccountMoneyIncome.textContent = balance
    ? `$${balance}.00`
    : '$0.00';

  // 15) display the expenses balance to the user interface
  trackerBalanceAccountMoneyExpense.textContent = expenseBalance
    ? `$${expenseBalance}.00`
    : '$0.00';
};

renderItem();
