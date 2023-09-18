import { View } from './view.js';
class AddQuestionToListView extends View {
  _parentEl = document.querySelector('.quiz__list');

  _generateHtml() {
    return this._data
      .map((item, index) => {
        // set the item.id to the index of the array
        item.id = index;
        return `
            <li class="quiz__item" data-id="${index}">
                <div class="quiz__item-content">
                <p class="quiz__item-paragraph quiz__item-index">${
                  index + 1
                }.</p>
                <p class="quiz__item-paragraph quiz__item-text">
                    ${item.text_area_value}
                </p>
                </div>
                <button class="btn btn--edit">edit</button>
            </li>
        `;
      })
      .join('');
  }
}
export default new AddQuestionToListView();
