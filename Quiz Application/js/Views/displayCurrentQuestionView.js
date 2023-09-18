import { View } from './view.js';

class DisplayCurrentQuestionView extends View {
  _parentEl = document.querySelector('.quiz__question');
  #current_quiz_exam_counter = 0;

  renderCurrentQuestionHandler(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        // use event delegation to select quiz__question-item element
        if (e.target.classList.contains('quiz__question-item')) {
          // 1) select element
          const quiz_question_contents = Array.from(
            document.querySelectorAll('.quiz__question-content')
          );

          const error_container = e.target
            .closest('.quiz__question-content')
            .querySelector('.error');

          const error_message =
            error_container.querySelector('.error__message');

          const error_emoji = error_container.querySelector('.error__emoji');

          const error_content =
            error_container.querySelector('.error__content');

          const quiz_option = e.target.querySelector('.quiz__option');

          // 2) get the text in quiz__question-title
          const question_heading = e.target
            .closest('.quiz__question-content')
            .querySelector('.quiz__question-title')
            .textContent.trim();

          // 3) get the text in user_answer element
          const user_answer = e.target
            .querySelector('.correct-answer')
            .textContent.trim();

          // 4) select all the quiz question items element and set the color to --opacity-white--color
          e.target
            .closest('.quiz__question-list')
            .querySelectorAll('.quiz__question-item')
            .forEach(
              item => (item.style.color = 'var(--opacity-white--color)')
            );

          // 5) select all quiz question item and set the point events properties to none
          e.target
            .closest('.quiz__question-list')
            .querySelectorAll('.quiz__question-item')
            .forEach(item => (item.style.pointerEvents = 'none'));

          // 6) increase the current_quiz_exam_counter by one
          this.#current_quiz_exam_counter++;

          // 7) check if the current quiz exam counter equals quiz question contents length
          if (
            this.#current_quiz_exam_counter === quiz_question_contents.length
          ) {
            // if the condition is met i want to change the btn next button text to finish
            e.target
              .closest('.quiz__question-list')
              .previousElementSibling.querySelector('.btn--next').textContent =
              'finish';

            // set the current quiz exam counter to 0
            this.#current_quiz_exam_counter = 0;
          }

          // 8) execute the handler function
          handler(
            question_heading,
            user_answer,
            error_container,
            error_message,
            error_emoji,
            error_content,
            quiz_option
          );
        }
      }.bind(this)
    );
  }
}
export default new DisplayCurrentQuestionView();
