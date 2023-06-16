'use strict';

// select element
const audioEl = document.querySelector('.audio');
const musicAudioImg = document.querySelector('.music__audio__img');
const btnPrev = document.querySelector('.btn--prev');
const btnPlay = document.querySelector('.btn--play');
const btnNext = document.querySelector('.btn--next');
const musicProgressbarContainer = document.querySelector(
  '.music__progressbar-container'
);
const musicProgressbarTitle = document.querySelector(
  '.music__progressbar-title'
);
const musicProgressbar = document.querySelector('.music__progressbar');
const iconPlay = document.querySelector('.icon--play');
const musicProgressbarWidth = document.querySelector(
  '.music__progressbar-width'
);

// array of objects
const musicDetailsArr = [
  { title: 'sample--1', src: 'music/sample-6s.mp3', img: 'img/img--1.jpg' },
  { title: 'sample--2', src: 'music/sample-9s.mp3', img: 'img/img--2.jpg' },
  { title: 'sample--3', src: 'music/sample-12s.mp3', img: 'img/img--3.jpg' },
];

let counter = 0;

audioEl.src = musicDetailsArr[counter].src;

musicAudioImg.src = musicDetailsArr[counter].img;

// play or pause the audio
const playPauseControl = function () {
  // 1) check if the audio element is paused, if it is pause the audio element should play but if it is play it should pause
  audioEl.paused ? audioEl.play() : audioEl.pause();

  // 2) displaying play and pause icon dynamically
  iconPlay.innerHTML = `
    <use xlink:href="img/icons.svg#${
      audioEl.paused ? 'icon-play3' : 'icon-pause2'
    }"></use>
  `;

  // 3) check if the audio element is play
  if (audioEl.play) {
    musicProgressbarContainer.classList.remove('hidden');
    musicAudioImg.classList.add('rotate');
  }

  // 4) check if the audio element is pause
  if (audioEl.paused) {
    musicProgressbarContainer.classList.add('hidden');
    musicAudioImg.classList.remove('rotate');
  }
};

// fuc
const nextContentFunc = function () {
  // 1) increase the counter when the button is click
  counter++;

  // 2) if the counter is greater than the musicDetailsArr length minus 1, it should set the counter to zero
  if (counter > musicDetailsArr.length - 1) {
    counter = 0;
  }

  musicFunctionChangeContent();
};

// function for
const musicFunctionChangeContent = function () {
  // 1) set the audio element src based on the number of ther counter
  audioEl.src = musicDetailsArr[counter].src;

  // 2) set the music title based on the number of ther counter
  musicProgressbarTitle.textContent = musicDetailsArr[counter].title;

  // 3) set the audio element currentTime to zero
  audioEl.currentTime = 0;

  // 4) set music image src to the musicDetailsArr
  musicAudioImg.src = musicDetailsArr[counter].img;

  // 5) execute the playPauseControl function
  playPauseControl();
};

// add play event on audio element
btnPlay.addEventListener('click', playPauseControl);

// add timeUpdate event on audio element
audioEl.addEventListener('timeupdate', function (e) {
  // 1) destructuring the currentTime and duration value
  const { currentTime, duration } = e.target;

  // 2) divide duration value by currentTime value and multiply it by 100 to get the progressbar width dynamically
  musicProgressbar.style.width = `${(currentTime / duration) * 100}%`;
});

// add click event on next button
btnNext.addEventListener('click', nextContentFunc);

// add click event on prev button
btnPrev.addEventListener('click', function () {
  // 1) decrease the counter
  counter--;

  // 2) if the counter is less than zero the counter should be musicDetailsArr length minus 1
  if (counter < 0) {
    counter = musicDetailsArr.length - 1;
  }

  musicFunctionChangeContent();
});

// add click event on progressbar width container
musicProgressbarWidth.addEventListener('click', function (e) {
  // 1) get the width of musicProgressbarWidth element
  const width = this.clientWidth;

  // 2) get the currentTime dynamically
  audioEl.currentTime = (e.offsetX / width) * audioEl.duration;
});

// add ended event on audio element
audioEl.addEventListener('ended', nextContentFunc);
