import { View } from './view.js';
import { progressbar_width } from '../helper.js';

class AddQuestionView extends View {
  _parentEl = document.querySelector('.quiz__question');
  #btn_insert = document.querySelector('.btn--insert');
  #text_area = document.querySelector('.form__textarea--1');
  #input_value = [];

  addQuestionHandler(handler) {
    this.#btn_insert.addEventListener(
      'click',
      function (e) {
        // 1) prevent form from reloading the page
        e.preventDefault();

        // 2)  select element
        const form_input_questions = document.querySelectorAll(
          '.form__input-question--1'
        );
        const radio_button = document.querySelector(
          'input[name=radio]:checked'
        );

        // 3) unassign variable
        let text_area_value;
        let correct_answer;

        // 4) hide the warning message
        this._hide_warning_message();

        // 5) check if the textarea is empty
        if (this.#text_area.value === '') {
          this._check_input_textarea_not_empty('Please insert a question');
          return;
        } else {
          this._hide_error_message();
        }

        // 6) empty the input array
        this.#input_value.splice(0);

        // 7) push all the in put value in input array
        form_input_questions.forEach(input => {
          this.#input_value.push(input.value);
        });

        // 8) filter the input value that are equal empty string
        const filter_input = this.#input_value.filter(input => input !== '');

        // 9) check if any input is not empty
        const is_any_input_empty = [...form_input_questions].some(
          input => input.value === ''
        );

        // 10) check if the user have filled two input
        if (
          this.#text_area !== '' &&
          is_any_input_empty &&
          filter_input.length < 2
        ) {
          this._check_input_textarea_not_empty(
            'You must insert at least two options'
          );
          return;
        }

        // 11) if the radio button is not check display an error message
        if (!radio_button) {
          this._check_input_textarea_not_empty(
            'You missed to check correct answer or you checked answer without value'
          );
          return;
        }

        // 12) if the radio button is checked but the input value is an empty string display an error message
        if (
          radio_button &&
          radio_button.closest('.form__radio-group').nextElementSibling
            .value === ''
        ) {
          this._check_input_textarea_not_empty(
            'You missed to check correct answer or you checked answer without value'
          );
          return;
        }

        // 13) store the text area value
        if (this.#text_area.value !== '') {
          text_area_value = this.#text_area.value.trim();
        }

        // 14) get the value of input when the radio button is checked
        if (
          radio_button &&
          radio_button.closest('.form__radio-group').nextElementSibling
            .value !== ''
        ) {
          correct_answer = radio_button
            .closest('.form__radio-group')
            .nextElementSibling.value.trim();
        }

        // 15) pass the variable to handler
        handler({
          id: '',
          text_area_value,
          correct_answer,
          options: filter_input,
        });

        // 15) execute progress width function
        progressbar_width();

        // 16) reset the input values, text area and radio button
        form_input_questions.forEach(input => {
          input.value = '';
        });
        this.#text_area.value = '';
        radio_button.checked = false;
      }.bind(this)
    );
  }

  _generateHtml() {
    return `
      ${this._data
        .map(question => this._generate_question_html(question))
        .join('')}
    `;
  }

  _generate_question_html(question) {
    return `
        <div class="quiz__question-content">
          <h3 class="heading--3 quiz__heading--3 quiz__question-title">
            ${question.text_area_value}
          </h3>
          <div class="error invisible">
            <p class="error__emoji">&nbsp;</p>
            <div class="error__content">
              <p class="error__message">&nbsp;</p>
              <button class="btn btn--next">next</button>
            </div>
          </div>
          <ul class="quiz__question-list">
          ${this._generate_options_html(question)}
          </ul>        
        </div>
    `;
  }

  _generate_options_html(question) {
    const alphabet_array = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    return `
      ${question.options
        .map((option, index) => {
          return `
          <li class="quiz__question-item">
            <h4 class="heading--4 quiz__heading--4 quiz__option">${alphabet_array[index]}</h4>
            <p class="quiz__answer correct-answer">${option}</p>
          </li>
        `;
        })
        .join('')}
    `;
  }
}
export default new AddQuestionView();
