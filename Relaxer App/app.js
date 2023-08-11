'use strict';

// select element
const relaxerContainer = document.querySelector('.relaxer__container');
const relaxerText = document.querySelector('.relaxer__text');

// time
const totalTime = 12;
const breatheTime = 5;
const holdTime = 2;

// we have to build a promise to avoid callback hell
const wait = function (seconds) {
  return new Promise(resovle => {
    // the resovle function should be execute every seconds that is passed in.
    setTimeout(resovle, seconds * 1000);
  });
};

// initialization function
const init = function () {
  // change the relaxer Text
  relaxerText.textContent = 'Breate in!';

  // override the classes in relaxer container
  relaxerContainer.className = 'relaxer__container grow';

  // cosume the wait promise
  wait(breatheTime)
    .then(() => {
      // change the relaxer Text when we consume the promise
      relaxerText.textContent = 'Hold!';

      // re-cosume the wait promise and pass holdTime parameter to it
      return wait(holdTime);
    })
    .then(() => {
      // change the relaxer text to breathe out
      relaxerText.textContent = 'breathe out!';

      // override the classes in relaxer container
      relaxerContainer.className = 'relaxer__container shrink';
    });
};

init();

// execute the init function every 12 seconds, because 12 seconds is the animation duration
setInterval(init, totalTime * 1000);
