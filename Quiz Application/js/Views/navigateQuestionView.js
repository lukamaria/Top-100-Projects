import { View } from './view.js';

class NavigateQuestionView extends View {
  _parentEl = document.querySelector('.quiz__question');
  #current_question_counter = 0;
  #current_quiz_navigation = 1;

  constructor() {
    super();
    this.navigateQuestionHandler();
  }

  navigateQuestionHandler() {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        // select btn--next by using event delegation
        if (e.target.classList.contains('btn--next')) {
          // 1) select element
          const quiz_question_contents = Array.from(
            document.querySelectorAll('.quiz__question-content')
          );

          const progressbar = document.querySelector('.progressbar');

          const custom_progressbar = document.querySelector(
            '.custom__progressbar'
          );

          const correct_answer_colors = document.querySelectorAll(
            '.correct-answer-color'
          );

          const quiz_final_score = document.querySelector(
            '.quiz__final-score__text'
          );

          // 2) store quiz question contents length in a variable
          const quiz_question_contents_length = quiz_question_contents.length;

          // 2) increase the current quiz navigation by 1
          this.#current_quiz_navigation++;

          // 3) set the current quiz navigation value to progressbar value
          progressbar.value = this.#current_quiz_navigation;

          // 4) set the progressbar value to current value variable
          const current_value = progressbar.value;

          // 5) create a new width of the progress bar
          const new_width =
            (current_value * 100) / quiz_question_contents_length;

          // 6) pass the new width to progressbar width
          custom_progressbar.style.width = `${new_width}%`;

          // 7) set both current quiz navigation and quiz question contents length into quiz current question element
          this._quiz_current_question.textContent = `${
            this.#current_quiz_navigation
          }/${quiz_question_contents_length}`;

          // 8) check if the current quiz navigation equal to quiz question contents length
          if (this.#current_quiz_navigation === quiz_question_contents_length) {
            // if the condition is met set the current quiz navigation to 0
            this.#current_quiz_navigation = 0;
          }

          // 9) set the correct answer color length to points variable
          const points = correct_answer_colors.length;

          // 10) set the firstname and lastname input value, points value inot quiz final score element
          quiz_final_score.textContent = `${document
            .querySelector('.form__input--firstname')
            .value.trim()
            .toLowerCase()} ${document
            .querySelector('.form__input--lastname')
            .value.trim()
            .toLowerCase()}, final score is ${points}`;

          // 11) check if the current question counter is greater than quiz question contents length minus 1
          if (
            this.#current_question_counter <
            quiz_question_contents_length - 1
          ) {
            // increase the current question counter
            this.#current_question_counter++;

            // set display properties to none on all quiz question contents
            quiz_question_contents.forEach(
              question_content => (question_content.style.display = 'none')
            );

            // set the display properties of current question to block
            quiz_question_contents[
              this.#current_question_counter
            ].style.display = 'block';
          } else {
            // add hidden class to quiz section 3 element
            this._quiz_section_3.classList.add('hidden');

            // remove hidden class on quiz section 4 element
            this._quiz_section_4.classList.remove('hidden');

            // set the current question counter to 0
            this.#current_question_counter = 0;
          }
        }
      }.bind(this)
    );
  }
}

export default new NavigateQuestionView();
