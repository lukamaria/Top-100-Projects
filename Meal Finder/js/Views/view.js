export default class View {
  _parentEl;
  _data;
  #recipeSearchParagraphy = document.querySelector(
    '.recipe__search-paragraphy'
  );
  #recipeDetails = document.querySelector('.recipe__details');

  render(data) {
    this._data = data;
    this.#clear();
    const markup = this._generateHtml();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this._parentEl.innerHTML = '';
  }

  renderErrorMessage(errorMessage) {
    this.#recipeSearchParagraphy.innerHTML = `${errorMessage}`;
    this._parentEl.innerHTML = '';
    this.#recipeDetails.innerHTML = '';
  }
}
