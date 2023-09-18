import { View } from './view.js';
import { progressbar_width } from '../helper.js';

class UpdateQuestionView extends View {
  _parentEl = document.querySelector('.form--2');
  _data;
  #text_area_element = document.querySelector('.form__textarea--2');

  updateQuestionHandler(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        // using event delegation to select the btn--update button
        if (e.target.classList.contains('btn--update')) {
          // 1) select element
          const form_input_questions = Array.from(
            document.querySelectorAll('.form__input-question--2')
          );
          const radio_button = document.querySelector(
            'input[name=radio]:checked'
          );

          // 2) unassign variable
          let text_area_value;
          let input_value_array;
          let correct_answer;

          // 3) prevent the page from reloading
          e.preventDefault();

          // 4) hide the warning message
          this._hide_warning_message();

          // 5) check if the radio button is not checked
          if (!radio_button) {
            // render an error if the radio button is not checked
            this._check_input_textarea_not_empty(
              'You missed to check correct answer or you checked answer without value'
            );
            return;
          } else {
            // hide the error message
            this._hide_error_message();

            // add hidden class to form edit element
            this._form_edit.classList.add('hidden');

            // remove hidden class from form input group 1 element
            this._form_input_group_1.classList.remove('hidden');

            // assign value to all the element that has not been assign
            correct_answer =
              radio_button.closest('.form__radio-group').nextElementSibling
                .value;

            text_area_value = this.#text_area_element.value;

            input_value_array = form_input_questions.map(input => input.value);

            // pass the text_area_value, correct_answer and input_value_array as argument to handler function
            handler(text_area_value, correct_answer, input_value_array);
          }
        }
      }.bind(this)
    );
  }
}

export default new UpdateQuestionView();
