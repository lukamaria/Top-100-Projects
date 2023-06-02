import View from './view.js';

class searchView extends View {
  _parentEl = document.querySelector('.recipe__content');
  _data;
  #form = document.querySelector('.form');
  #recipeDetails = document.querySelector('.recipe__details');

  searchViewHandler(handler) {
    this.#form.addEventListener('submit', function (e) {
      // prevent the form from automatically submitting
      e.preventDefault();

      // select the element
      const input = this.querySelector('.form__input-search');

      const recipeSearchParagraphy = document.querySelector(
        '.recipe__search-paragraphy'
      );

      // if the input value is empty string return;
      if (input.value === '') return;

      // passing the input value to parameter
      handler(input.value);

      // render the recipe search paragraphy to the user interface
      recipeSearchParagraphy.innerHTML = `Search result for <span class="recipe__search-keyword">'${input.value}'</span>:`;

      // set the input value to empty string
      input.value = '';

      // remove focus from the input
      input.blur();
    });
  }

  _generateHtml() {
    // set the recipe details element to an empty strin
    this.#recipeDetails.innerHTML = '';

    return this._data.map(recipe => this.#generateHtmlMeal(recipe)).join('');
  }

  #generateHtmlMeal(recipe) {
    return `
      <figure class="recipe__img-container">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe__img" />
        <figcaption class="recipe__img-caption recipe__item">
        ${recipe.strMeal}
        </figcaption>
      </figure> 
    `;
  }
}

export default new searchView();
