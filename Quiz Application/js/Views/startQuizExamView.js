import { View } from './view.js';
import { progressbar_width } from '../helper.js';

class StartQuizExamView extends View {
  _parentEl = document.querySelector('.quiz__question');
  #form_1 = document.querySelector('#form--1');
  #firstname = document.querySelector('.form__input--firstname');
  #lastname = document.querySelector('.form__input--lastname');

  checkFirstnameAndLastnameHandler(handler) {
    this.#form_1.addEventListener(
      'submit',
      function (e) {
        // 1) prevent the page from reloading
        e.preventDefault();

        // 2) store the firstname and lastname value
        const firstname_value = document
          .querySelector('.form__input--firstname')
          .value.toLowerCase()
          .trim();

        const lastname_value = document
          .querySelector('.form__input--lastname')
          .value.toLowerCase()
          .trim();

        // select element
        const quiz_item_array = Array.from(
          document.querySelectorAll('.quiz__item')
        );

        // 4) check if the firstname and lastname input are not empty
        if (firstname_value === '' || lastname_value === '') {
          // display the error message
          this._display_error_message();

          // change text in the error message
          this._error_message_paragraph.textContent =
            'Please, enter your firstname and lastname';
          return;
        } else {
          // 4) hide the main error element after 3s
          this._hide_error_message();
        }

        // 5) if the firstname and lastname is equal to busari shakrullahi, remove hidden class from section--2 and add hidden to section--1
        if (firstname_value === 'busari' && lastname_value === 'shakrullahi') {
          // 1) set the firstname and lastname value to an empty string
          this.#firstname.value = this.#lastname.value = '';

          // 2) add hidden class from  quiz section 1 and remove hidden class from quiz section 2
          this._quiz_section_1.classList.add('hidden');
          this._quiz_section_2.classList.remove('hidden');
          return;
        }

        // 6) if the condition is meet to display an error message
        if (quiz_item_array.length < 1) {
          this._check_input_textarea_not_empty(
            'Quiz is not ready, Please contact the administrator'
          );
          return;
        }

        // 7) if the condition is meet to display the quiz exam
        if (quiz_item_array.length >= 1) {
          // hide the error message
          this._hide_error_message();

          // add hidden class to quiz section 1 element
          this._quiz_section_1.classList.add('hidden');

          // remove hidden class to quiz section 3 element
          this._quiz_section_3.classList.remove('hidden');

          // execute progress width function
          progressbar_width();
        }

        // 8) pass the firstname and lastname value into handler function
        handler(firstname_value, lastname_value);
      }.bind(this)
    );
  }
}

export default new StartQuizExamView();
