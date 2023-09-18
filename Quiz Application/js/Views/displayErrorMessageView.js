import { View } from './view.js';

class DisplayErrorMessage extends View {
  _parentEl = document.querySelector('.btn--clear-list');

  constructor() {
    // 1) execute the super function to be able to used the this key word
    super();

    // 2) execute the this.displayErrorHandler() method when the page loads
    this.displayErrorHandler();
  }

  displayErrorHandler() {
    this._parentEl.addEventListener(
      'click',
      function () {
        // 1) select element
        const quiz_items = document.querySelectorAll('.quiz__item');

        // 2) check if the length of the quiz items is greater than 0
        if (quiz_items.length < 1) {
          //  remove hide-main-error class from the warning container element
          this._warning_container.classList.remove('hide-main-error');

          //  change the text in the warning message element
          this._warning_message.textContent = 'There is no question yet';
        } else {
          // remove hide-main-error class from the warning container element
          this._warning_container.classList.remove('hide-main-error');

          // change the text in the warning message element
          this._warning_message.textContent =
            'Warning, you will lose entire question list';
        }
      }.bind(this)
    );
  }
}
export default new DisplayErrorMessage();
