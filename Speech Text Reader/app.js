'use strict';

// select element
const speechContent = document.querySelector('.speech__content');
const speechVoiceDetails = document.querySelector('.speech__voice-details');
const speechVoiceCategory = document.querySelector('.speech__voice-category');
const form = document.querySelector('.form');
const speechTextArea = document.querySelector('.speech__text-area');

// select buttons
const btnToggle = document.querySelector('.btn--toggle');
const btnClose = document.querySelector('.btn--close');

// toggle hidden class on speech voice details element
btnToggle.addEventListener('click', function () {
  speechVoiceDetails.classList.toggle('hidden');
});

// add hidden class on speech voice details element
btnClose.addEventListener('click', function () {
  speechVoiceDetails.classList.add('hidden');
});

// it allows us to add and remove active class from event target element
const addAndRemoveActiveClass = function (event) {
  // add active class on event target element
  event.target.classList.add('active');

  // remove active class on event target element after 1seconds
  setTimeout(() => {
    event.target.classList.remove('active');
  }, 1000);
};

// voices array
let voices = [];

// create the option element
const createSelectOptions = function () {
  // pass the voice get into the voices array
  voices = speechSynthesis.getVoices();

  // create the option element and append it into the select element
  voices.forEach(voice => {
    // create option element
    const option = document.createElement('option');

    // pass the voice name to option value
    option.value = voice.name;

    // pass the voice name and lang property as text into the option
    option.textContent = `${voice.name} ${voice.lang}`;

    // Add default string to the option, if voice default property is true
    if (voice.default) {
      option.textContent = `${voice.name} -- DEFAULT --`;
    }

    // append the option to the select element
    speechVoiceCategory.append(option);
  });
};

// it contains main functionality
const speechDetailsFunc = function (text = speechTextArea.value) {
  // select option from the select element
  const selectedOption = speechVoiceCategory.selectedOptions[0];

  // passing the textarea value int the the utterance interface
  const utterance = new SpeechSynthesisUtterance(text);

  // looping through the voices array to change voice if the voice.name property is equal to selectedOption value
  voices.forEach(voice => {
    if (voice.name === selectedOption.value) {
      utterance.voice = voice;
    }
  });
  // pass utterance as an argument into the speechSynthesis.speak() method
  speechSynthesis.speak(utterance);
};

// by adding voiceschanged event to the speechSynthesis interface and pass createSelectOptions function as it callback function, it will display all the options element in the select element
speechSynthesis.addEventListener('voiceschanged', createSelectOptions);

// add submit event on form element
form.addEventListener('submit', function (e) {
  // prevent the form from automatically submitting
  e.preventDefault();

  // execute speakDetailsFunc function
  speechDetailsFunc();

  // reset the form when the form has submitted
  // e.target.reset();
});

// add change event on select element
speechVoiceCategory.addEventListener('change', function () {
  // execute speakDetailsFunc function
  speechDetailsFunc();
});

// add click event on speechContent element
speechContent.addEventListener('click', function (e) {
  // using event delegation to select the speech image container
  if (e.target.classList.contains('speech__img-container')) {
    // select the speech caption from event target
    const speechCaption = e.target.querySelector('.speech__caption');

    // execute speakDetailsFunc function
    speechDetailsFunc(speechCaption.textContent);

    // execute addAndRemoveActiveClass function
    addAndRemoveActiveClass(e);
  }
});
