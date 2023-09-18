import { View } from './view.js';

class DeleteResultView extends View {
  _parentEl = document.querySelector('.quiz__result-details');

  deleteResultHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      // use event delegation to select btn--delete-result button
      if (e.target.classList.contains('btn--delete-result')) {
        // 1) get the id value from the quiz result content element of the target element
        const id = +e.target.closest('.quiz__result-content').dataset.id;

        // 2) pass the id as an argument to the handler function and execute the function
        handler(id);
      }
    });
  }
}

export default new DeleteResultView();
