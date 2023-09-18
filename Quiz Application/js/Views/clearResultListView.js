import { View } from './view.js';

class ClearResultListView extends View {
  _parentEl = document.querySelector('.btn--clear-result');

  clearResultListHandler(handler) {
    this._parentEl.addEventListener('click', function () {
      // execute the handler function
      handler();
    });
  }
}

export default new ClearResultListView();
