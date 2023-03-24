'use strict';

// select element
const videoCustomized = document.querySelector('.video__customized');
const videoContainer = document.querySelector('.video');
const mainVideo = document.querySelector('.video__element');
const playPauseBtn = document.querySelector('.btn--play-pause');
const stopBtn = document.querySelector('.btn--stop');
const fastForwardBtn = document.querySelector('.btn--fast-forward');
const rewindBtn = document.querySelector('.btn--rewind');
const progressBar = document.querySelector('.video__progressbar');
const slowMotionBtn = document.querySelector('.btn--slow-motion');
const videoSpeed = document.querySelector('.video__speed');
const picInpicBtn = document.querySelector('.btn--picture-in-picture');
const fullScreenBtn = document.querySelector('.btn--fullscreen');
const volumeBtn = document.querySelector('.btn--volume');
const volumeSlider = document.querySelector('.video__volume-slider');
const videoCurrentTime = document.querySelector('.video__current-time');
const videoDuration = document.querySelector('.video__duration');
const progressBarContainer = document.querySelector(
  '.video__progressbar-container'
);
// state variable to clear the timer
let timer;

// hide customized video
const hideCustomizedVideo = function () {
  // if the video is pause, it should return immediately
  if (mainVideo.paused) return;
  // add hidden class to videoCustomized after 3 seconds
  timer = setTimeout(function () {
    videoCustomized.classList.add('hidden');
  }, 3000);
};
hideCustomizedVideo();

// add mousemove event on videoContainner
videoContainer.addEventListener('mousemove', function () {
  // remove the hidden class from videoCustomized
  videoCustomized.classList.remove('hidden');
  // clear the timer
  clearTimeout(timer);
  // calling the function when mousemove
  hideCustomizedVideo();
});

// formatting time to hour, seconds and minutes
const formatTime = function (time) {
  let hour = Math.floor(time / 3600);
  let min = Math.floor((time - hour * 3600) / 60);
  let sec = Math.floor(time - hour * 3600 - min * 60);

  // reassign the value of the hour, min and sec if they are less than 10
  hour = hour < 10 ? `0${hour}` : hour;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  // if the hours is 00 it should return minutes and secs else it should return all
  if (hour === '00') {
    return `${min}:${sec}`;
  }

  return `${hour}:${min}:${sec}`;
};

// add timeupdate on mainVideo
mainVideo.addEventListener('timeupdate', function (e) {
  // 1) get the currentTime and duration value from mainVideo
  const { currentTime, duration } = e.target;
  // 2) creating the progress bar width dynamically
  const percent = (currentTime / duration) * 100;
  // 3) pass the value to progress bar width and convert it to percentage
  progressBar.style.width = `${percent}%`;
  // 4) pass the currentTime to videoCurrentTime
  videoCurrentTime.textContent = formatTime(currentTime);
});

// render the video duration when the video load
mainVideo.addEventListener('loadeddata', function () {
  videoDuration.textContent = formatTime(this.duration);
});

// change the playPauseBtn when click
const changePlayPause = function () {
  // 1) select svg element
  const svg = playPauseBtn.querySelector('svg');

  // 2) create html markup
  const markup = `
      <use xlink:href="img/icons.svg#icon-media-play"></use>
    `;
  // set the markup to svg elemet
  svg.innerHTML = markup;
};

const playPauseController = function (e) {
  // 1) play the video if it is paused and pause the video if it is play
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();

  // 2) select svg element
  const svg = playPauseBtn.querySelector('svg');

  // 3) create html markup
  const markup = `
    <use xlink:href="img/icons.svg#icon-media-${
      mainVideo.paused ? 'play' : 'pause'
    }"></use>
    `;
  // set the markup to svg elemet
  svg.innerHTML = markup;
};

// add click event to play and pause the video
playPauseBtn.addEventListener('click', playPauseController);

// change the pause icon to play when the video end
mainVideo.addEventListener('ended', changePlayPause);

// add click on video element
mainVideo.addEventListener('click', playPauseController);

// add click event on stop button
stopBtn.addEventListener('click', function () {
  // 1) set the video currentTime to 0
  mainVideo.currentTime = 0;
  // 2) pause the video
  mainVideo.pause();

  changePlayPause();
});

// add click event on fastforward button
fastForwardBtn.addEventListener('click', function () {
  // add 5 secs to video current time
  mainVideo.currentTime += 5;
});

// add click event on rewind button
rewindBtn.addEventListener('click', function () {
  // substract 5 secs to video current time
  mainVideo.currentTime -= 5;
});

// add click event on slow motion button
slowMotionBtn.addEventListener('click', function () {
  videoSpeed.classList.toggle('show');
});

// select all the element with video__speed--value loop through them and add click event on each of it
videoSpeed.querySelectorAll('.video__speed--value').forEach(el => {
  el.addEventListener('click', function (e) {
    // 1) set the value from data attribute to playbackRate properties
    mainVideo.playbackRate = e.target.dataset.speed;
    // 2) select element which has active class and remove the class
    videoSpeed.querySelector('.active').classList.remove('active');
    // 3) add active on the target element
    e.target.classList.add('active');
  });
});

// add click event on picInpicBtn
picInpicBtn.addEventListener('click', function () {
  mainVideo.requestPictureInPicture();
});

//
const checkForFullScreen = function () {
  // select svg element
  const svg = fullScreenBtn.querySelector('svg');
  // check if the video is in fullscreen mode to set it back to normal size
  if (document.fullscreenElement) {
    // change the icon to default
    svg.innerHTML = `<use xlink:href="img/icons.svg#icon-fullscreen"></use>`;
    return document.exitFullscreen();
  }

  // make the video to go to fullscreen mode
  videoContainer.requestFullscreen();
  // change the icon
  svg.innerHTML = `<use xlink:href="img/icons.svg#icon-fullscreen_exit"></use>`;
};

// add click event on fullScreenBtn
fullScreenBtn.addEventListener('click', checkForFullScreen);

// add double click event on video element
mainVideo.addEventListener('dblclick', checkForFullScreen);

// add click event on volume btn
volumeBtn.addEventListener('click', function () {
  // 1) create a mute class just to set the volume to 0 or 0.5
  this.classList.toggle('mute');
  // 2) select svg
  const svg = this.querySelector('svg');
  // 3) check if the volumeBtn contain mute class
  if (this.classList.contains('mute')) {
    // 4) set the volume properties to 0 if volumeBtn contain mute class
    mainVideo.volume = 0;
  } else {
    // 5) set the volume properties to 0.5 if volumeBtn does not contain mute class
    mainVideo.volume = 0.5;
  }

  // 6) change the svg icon when toggle mute class
  svg.innerHTML = `<use xlink:href="img/icons.svg#icon-volume${
    this.classList.contains('mute') ? '1' : ''
  }"></use>`;
  // 7) set the volume properties value to volumeSlider value
  volumeSlider.value = +mainVideo.volume;
});

// add input event on volumeSlider
volumeSlider.addEventListener('input', function () {
  // passing the value getting from volumeSlider to mainVideo volume properties
  mainVideo.volume = this.value;
});

// get the progressBarContainer width and set the video currentTime dynamically
const getProgressBarWidthAndCurrentTime = function (e) {
  // get the width of the progressBar container
  const progressBarContainerWidth = progressBarContainer.clientWidth;
  // set the video currentTime dynamically
  mainVideo.currentTime =
    (e.offsetX / progressBarContainerWidth) * mainVideo.duration;
};

// add click event on progressBarContainer
progressBarContainer.addEventListener(
  'click',
  getProgressBarWidthAndCurrentTime
);

// draggable function
const dragProgressBar = function (e) {
  // set progressBar width to offsetX of the mouse
  progressBar.style.width = `${e.offsetX}px`;
  // get the width of the progressBar container
  const progressBarContainerWidth = progressBarContainer.clientWidth;
  // set the video currentTime dynamically
  mainVideo.currentTime =
    (e.offsetX / progressBarContainerWidth) * mainVideo.duration;
  // set the currentTime to videoCurrentTime
  videoCurrentTime.textContent = formatTime(mainVideo.currentTime);
};

// add mousemove event on progressBarContainer when the mouse is down
progressBarContainer.addEventListener('mousedown', function () {
  progressBarContainer.addEventListener('mousemove', dragProgressBar);
});

// remove mousemove event on progressBarContainer when the mouse is up
progressBarContainer.addEventListener('mouseup', function () {
  progressBarContainer.removeEventListener('mousemove', dragProgressBar);
});

// add mousemove event on progressBarContainer
progressBarContainer.addEventListener('mousemove', function (e) {
  // select tooltip element
  const toolTip = this.querySelector('.video__progressabr-tooltip');
  // set left properties on tooltip to offsetX value
  toolTip.style.left = `${e.offsetX}px`;
  // get the container width
  const progressBarContainerWidth = this.clientWidth;
  // get the tooltip time dynamically
  const toolTipTime =
    (e.offsetX / progressBarContainerWidth) * mainVideo.duration;
  // set the tooltip time value to tooltip textcontent
  toolTip.textContent = formatTime(toolTipTime);
});
