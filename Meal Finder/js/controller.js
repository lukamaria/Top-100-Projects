import * as model from './model.js';
import searchView from './Views/searchView.js';
import randomView from './Views/randomView.js';
import detailsView from './Views/detailsView.js';
import View from './Views/view.js';

const renderMeal = async function (query) {
  try {
    //  1) recieved meals from loadMeal function
    await model.loadMeal(query);

    // 2) render the recipe to the user
    searchView.render(model.state.meals);
  } catch (err) {
    searchView.renderErrorMessage(err.message);
  }
};

const renderRandomMeal = async function () {
  try {
    //  1) recieved random meals from randomMeal function
    await model.randomMeal();

    // 2) render the random meal recipe to the user
    randomView.render(model.state.meals);
  } catch (err) {
    console.log(err);
  }
};

const renderRecipeItemDetails = function (recipe) {
  // retrieving an object of recipe from meals array
  detailsView.render(model.state.meals[recipe]);
};

const init = function () {
  // executing the renderMeal function
  searchView.searchViewHandler(renderMeal);

  // executing the renderRandomMeal function
  randomView.randomViewHandler(renderRandomMeal);

  // executing the renderRecipeItemDetails
  detailsView.detailsViewHandler(renderRecipeItemDetails);
};

init();
