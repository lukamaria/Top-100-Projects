'use strict';

// select element
const spinnerImage = document.querySelector('.spinner');
const countDownDetails = document.querySelector('.count-down__details');
const countDownYear = document.querySelector('.count-down__year');
const countDownDay = document.querySelector('.count-down__days');
const countDownHours = document.querySelector('.count-down__hours');
const countDownMinutes = document.querySelector('.count-down__minutes');
const countDownSeconds = document.querySelector('.count-down__seconds');

// toggle hidden class in both spinner and count down details element
setTimeout(() => {
  // toggle hidden class to spinner image element
  spinnerImage.classList.toggle('hidden');

  // toggle hidden class to count down details element
  countDownDetails.classList.toggle('hidden');
}, 2000);

// render count down function
const renderCountDownTimer = function () {
  // get the value of new year
  const newYear = new Date().getFullYear();

  // set the new year value to count down year element and add 1 to it to get the value of next year value
  countDownYear.textContent = newYear + 1;

  // get the count down date
  const countDownDate = new Date(`Jan 1, ${newYear + 1} 00:00:00`).getTime();

  // get the current date
  const currentDate = new Date().getTime();

  // subtract the current date from count down date
  const countDownTime = countDownDate - currentDate;

  // format the time parameters
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // use time parameters to format the count down time variable and used math.floor method to round down the integer to the largest value
  const currentDay = Math.floor(countDownTime / day);
  const currentHour = Math.floor((countDownTime % day) / hour);
  const currentMinute = Math.floor((countDownTime % hour) / minute);
  const currentSecond = Math.floor((countDownTime % minute) / second);

  // set the currentDay, currentHour, currentMinute and currentSecond varible to  there respectively element. Check if there value is less than 10 to concat 0 at the front of them.
  countDownDay.textContent = currentDay < 10 ? `0${currentDay}` : currentDay;
  countDownHours.textContent =
    currentHour < 10 ? `0${currentHour}` : currentHour;
  countDownMinutes.textContent =
    currentMinute < 10 ? `0${currentMinute}` : currentMinute;
  countDownSeconds.textContent =
    currentSecond < 10 ? `0${currentSecond}` : currentSecond;
};

// execute the renderCountDownTimer function
renderCountDownTimer();

// execute renderCountDownTimer every 1 seconds
setInterval(renderCountDownTimer, 1000);
