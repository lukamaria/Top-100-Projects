import { View } from './view.js';

class LogoutAdminView extends View {
  _parentEl = document.querySelector('.btn--logout--1');

  constructor() {
    // 1) execute the super function to be able to use the this keyword
    super();

    // 2) execute logoutAdminHandler() method
    this._logoutAdminHandler();
  }

  _logoutAdminHandler() {
    this._parentEl.addEventListener(
      'click',
      function () {
        // 1) remove hidden class from quiz section 1 element
        this._quiz_section_1.classList.remove('hidden');

        // 2) add hidden class to quiz section 2 element
        this._quiz_section_2.classList.add('hidden');

        // 3) hide the warning message
        this._hide_warning_message();
      }.bind(this)
    );
  }
}

export default new LogoutAdminView();
