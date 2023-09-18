import { View } from './view.js';

class LogoutScoreView extends View {
  _parentEl = document.querySelector('.quiz__result-details');
  #btn_logout_2 = document.querySelector('.btn--logout--2');

  logoutScoreHandler(handler) {
    this.#btn_logout_2.addEventListener(
      'click',
      function (e) {
        // 1) select element
        const quiz_question_contents = Array.from(
          document.querySelectorAll('.quiz__question-content')
        );

        const quiz_question_items = document.querySelectorAll(
          '.quiz__question-item'
        );

        const error_contents = document.querySelectorAll('.error__content');

        const quiz_options = document.querySelectorAll('.quiz__option');

        const error_containers = document.querySelectorAll('.error');

        const correct_answer_colors = document.querySelectorAll(
          '.correct-answer-color'
        );

        // 2) add hidden class to quiz section 4 element
        this._quiz_section_4.classList.add('hidden');

        // 3) remove hidden class from quiz section 1 element
        this._quiz_section_1.classList.remove('hidden');

        // 4) assign the length of the correct answer colors element to points variable
        const points = correct_answer_colors.length;

        // 5) set the display properties of all quiz question contents element to noen
        quiz_question_contents.forEach(
          quiz_question_content =>
            (quiz_question_content.style.display = 'none')
        );

        // 6) set the display properties of the first quiz question contents element to block
        quiz_question_contents[0].style.display = 'block';

        // 7) set the color properties of all quiz question items to inherit
        quiz_question_items.forEach(item => (item.style.color = 'inherit'));

        // 8) set the pointer events of all quiz question items to visible
        quiz_question_items.forEach(
          item => (item.style.pointerEvents = 'visible')
        );

        // 9) remove both correct-answer-color and error-color class from each error_contents
        error_contents.forEach(error_content =>
          error_content.classList.remove('correct-answer-color', 'error-color')
        );

        // 10) change the backgroudcolor of each quiz option to --dark--gray
        quiz_options.forEach(
          quiz_option =>
            (quiz_option.style.backgroundColor = 'var(--dark--gray)')
        );

        // 11) add invisible class to all error container element
        error_containers.forEach(error_container =>
          error_container.classList.add('invisible')
        );

        // 12) set both the firstname input and lastname input to empty string
        document.querySelector('.form__input--firstname').value =
          document.querySelector('.form__input--lastname').value = '';

        // 13) pass an object to handler function
        handler({ id: '', points });
      }.bind(this)
    );
  }

  _generateHtml() {
    return `
      ${this._data
        .map((result, index) => {
          result.id = index;
          return this._generate_result_html(result, index);
        })
        .join('')}
    `;
  }

  _generate_result_html(result, index) {
    return `
      <li class="quiz__result-content" data-id="${index}">
        <p class="quiz__result-text">${result.firstname} ${result.lastname} - ${result.points} points</p>
        <button class="btn btn--delete-result">detele</button>
      </li>
    `;
  }
}

export default new LogoutScoreView();
