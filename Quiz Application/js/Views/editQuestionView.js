import { View } from './view.js';

class EditQuestionView extends View {
  _parentEl = document.querySelector('.form__input-group__content--2');
  #question_list = document.querySelector('.quiz__list');

  editQuestionHandler(handler) {
    this.#question_list.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('btn--edit')) {
          // 1) select the text area element
          const form_text_area_2 = document.querySelector('.form__textarea--2');

          // 2) retrieve id value from the parent element of the target element
          const id = +e.target.closest('.quiz__item').dataset.id;

          // 3) remove hidden class from form edit element
          this._form_edit.classList.remove('hidden');

          // 4) add hidden class to the form input group 1 element
          this._form_input_group_1.classList.add('hidden');

          // 5) hide the warning messgae
          this._hide_warning_message();

          // 6) pass both the id and form text area 2 element as an argument to the handler function
          handler(id, form_text_area_2);
        }
      }.bind(this)
    );
  }

  // insert the html markup to the dom
  _generateHtml() {
    console.log(this._data);
    return `
    ${this._data.options
      .map(input => this._generate_input_radio_button_html(input))
      .join('')}
    `;
  }

  // html markup for radio button and input field
  _generate_input_radio_button_html(input) {
    return `
      <div class="form__control--2">
        <label class="form__radio-group">
          <input type="radio" class="form__input-radio" name="radio" value=""/>
          <span class="form__customize-radio"></span>
        </label>
        <input
          type="text"
          class="form__input-question form__input-question--2 form__focus"
          value="${input}"
        />
      </div>
    `;
  }
}
export default new EditQuestionView();
