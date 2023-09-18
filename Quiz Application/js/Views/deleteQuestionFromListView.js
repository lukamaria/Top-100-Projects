import { View } from './view.js';
import { progressbar_width } from '../helper.js';

class DeleteQuestionFromListView extends View {
  _parentEl = document.querySelector('.form--2');
  #text_area_element = document.querySelector('.form__textarea--2');

  deleteQuestionHandler(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        // use event delegation to select btn--delete-question button
        if (e.target.classList.contains('btn--delete-question')) {
          // 1) prevent page from reloading
          e.preventDefault();

          // 2) unassign variable
          let text_area_value;

          // 3) assign the text_area_value
          text_area_value = this.#text_area_element.value;

          // 4) add hidden class to form edit element
          this._form_edit.classList.add('hidden');

          // 5) remove hidden class from form input group 1 element
          this._form_input_group_1.classList.remove('hidden');

          // 6) hide the warning message
          this._hide_warning_message();

          // 7) hide the error message
          this._hide_error_message();

          // 8) pass text_area_value as argument to handler function
          handler(text_area_value);

          // 9) execute the progress width function
          progressbar_width();
        }
      }.bind(this)
    );
  }
}

export default new DeleteQuestionFromListView();
