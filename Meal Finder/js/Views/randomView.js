import View from './view.js';

class RandomView extends View {
  _parentEl = document.querySelector('.recipe__details');
  _data;
  #btnRandom = document.querySelector('.btn--random');
  #recipeContent = document.querySelector('.recipe__content');
  #recipeSearchParagraphy = document.querySelector(
    '.recipe__search-paragraphy'
  );

  randomViewHandler(handler) {
    this.#btnRandom.addEventListener('click', function () {
      handler();
    });
  }

  _generateHtml() {
    // set recipe content to an empty string
    this.#recipeContent.innerHTML = '';

    // set recipe search paragraphy to an empty string
    this.#recipeSearchParagraphy.innerHTML = '';

    return this._data.map(meal => this.#generateHtmlMeal(meal));
  }

  #generateHtmlMeal(meal) {
    return `
        <figure class="recipe__details__img-container">
            <h2 class="heading--2 recipe__title">${meal.strMeal}</h2>
            <img
            src="${meal.strMealThumb}"
            alt="recipe 2"
            class="recipe__details__img"
            />
        </figure>
        <div class="recipe__category">
            <p class="recipe__paragraphy recipe__category-text">${
              meal.strCategory
            }</p>
            <p class="recipe__paragraphy recipe__category-text">${
              meal.strArea
            }</p>
        </div>
        <p class="recipe__paragraphy recipe__instructions">${
          meal.strInstructions
        }</p>
        <div class="recipe__ingredients">
            <h3 class="heading--3 recipe__ingredients-title">Ingredients</h3>
            <div class="recipe__ingredients-details">
            ${this.#generateMarkup(meal)}
            </div>
        </div>
    `;
  }

  #generateMarkup(meal) {
    // 1) convert the object to an array and filter ingredients from the array
    const ingredients = Object.entries(meal).filter(
      ing => ing[0].startsWith('strIngredient') && ing[1] !== ''
    );

    // 2) convert the object to an array and filter quantity from the array
    const quantityArr = Object.entries(meal).filter(
      unit => unit[0].startsWith('strMeasure') && unit[1].trim() !== ''
    );

    // 3) mapping through ingredients array to display ingredient and quantity to the user interface
    return ingredients
      .map((ing, i) => {
        const quantity = quantityArr[i];
        return `
          <p class="recipe__ingredients-name">
            ${ing[1]} -
            <span class="recipe__ingredients-quantity">${quantity[1]}</span> 
          </p>
      `;
      })
      .join('');
  }
}

export default new RandomView();
