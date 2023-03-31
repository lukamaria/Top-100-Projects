'use strict';
const selectItems1 = document.querySelector('.currency__select-items--1');
const selectItems2 = document.querySelector('.currency__select-items--2');
const amount1 = document.querySelector('.currency__amount--1');
const amount2 = document.querySelector('.currency__amount--2');
const swapBtn = document.querySelector('.btn--swap');
const text = document.querySelector('.text');

selectItems1.selectedIndex = 9;
selectItems2.selectedIndex = 14;

let resultFrom = selectItems1.value;
let resultTo = selectItems2.value;

console.log(resultFrom);

const rateConverter = async function (rate) {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/3d2017983106ddff1b9f470b/latest/${rate}`
  );
  const data = await res.json();
  const currency = data.conversion_rates;
  console.log(currency);
  return currency;
};

selectItems1.addEventListener('change', function (e) {
  resultFrom = e.target.value;
  displayResult();
});

selectItems2.addEventListener('change', function (e) {
  resultTo = e.target.value;
  displayResult();
});

const displayResult = async function () {
  const currency = await rateConverter(resultFrom);

  const result1 = currency[resultFrom];
  const result2 = currency[resultTo];

  amount1.value = 1;

  amount2.value = ((result2 / result1) * amount1.value).toFixed(4);
  text.textContent = `1 ${resultFrom} = ${((result2 / result1) * 1).toFixed(
    4
  )} ${resultTo}`;
  amount1.addEventListener('input', function (e) {
    amount2.value = ((result2 / result1) * amount1.value).toFixed(4);
    text.textContent = `1 ${resultFrom} = ${((result2 / result1) * 1).toFixed(
      4
    )} ${resultTo}`;
  });
};

displayResult();

swapBtn.addEventListener('click', function (e) {
  if (e.target) {
    resultFrom = selectItems2.value;
    resultTo = selectItems1.value;
    const index = selectItems1.selectedIndex;
    selectItems1.selectedIndex = selectItems2.selectedIndex;
    selectItems2.selectedIndex = index;
    displayResult();
  }
});
