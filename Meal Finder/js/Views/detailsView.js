import View from './view.js';

class DetailsView extends View {
  _parentEl = document.querySelector('.recipe__details');
  #recipeContent = document.querySelector('.recipe__content');
  _data;

  detailsViewHandler(handler) {
    // Using event delegation
    this.#recipeContent.addEventListener('click', function (e) {
      // event should fire on an element that has recipe__item class
      if (e.target.classList.contains('recipe__item')) {
        // selecting all an element that have recipe__item class
        const recipeItems = document.querySelectorAll('.recipe__item');

        // retrieving index number of an element from recipeItems
        const item = Array.from(recipeItems).indexOf(e.target);

        // passing the index number retrieved to handler function
        handler(item);
      }
    });
  }

  _generateHtml() {
    return this.#generateHtmlMeal();
  }

  #generateHtmlMeal() {
    return `
        <figure class="recipe__details__img-container">
            <h2 class="heading--2 recipe__title">${this._data.strMeal}</h2>
            <img
            src="${this._data.strMealThumb}"
            alt="recipe 2"
            class="recipe__details__img"
            />
        </figure>
        <div class="recipe__category">
            <p class="recipe__paragraphy recipe__category-text">${
              this._data.strCategory
            }</p>
            <p class="recipe__paragraphy recipe__category-text">${
              this._data.strArea
            }</p>
        </div>
        <p class="recipe__paragraphy recipe__instructions">${
          this._data.strInstructions
        }</p>
        <div class="recipe__ingredients">
            <h3 class="heading--3 recipe__ingredients-title">Ingredients</h3>
            <div class="recipe__ingredients-details">
             ${this.#generateMarkup()}
            </div>
        </div>
    `;
  }

  #generateMarkup() {
    // 1) convert the object to an array and filter ingredients from the array
    const ingredients = Object.entries(this._data).filter(
      ing =>
        ing[0].startsWith('strIngredient') && ing[1] !== '' && ing[1] !== null
    );

    // 2) convert the object to an array and filter quantity from the array
    const quantityArr = Object.entries(this._data).filter(
      unit => unit[0].startsWith('strMeasure') && unit[1] !== null
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

export default new DetailsView();
