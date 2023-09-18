import { View } from './view.js';

class ClearQuestionListView extends View {
  _parentEl = document.querySelector('#btn--close--2');

  clearQuestionListHandler(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        // 1) add hidden class to form edit element
        this._form_edit.classList.add('hidden');

        // 2) remove hidden class from form input group 1 element
        this._form_input_group_1.classList.remove('hidden');

        // 3) hide the warning message
        this._hide_warning_message();

        // 4) execute the handler function
        handler();
      }.bind(this)
    );
  }
}

export default new ClearQuestionListView();
