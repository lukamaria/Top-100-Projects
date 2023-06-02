import { API_URL } from './config.js';

export const state = {
  meals: [],
  search: {
    query: '',
  },
};

export const loadMeal = async function (mealFirstLetter) {
  try {
    // 1) fetch data from an api
    const res =
      mealFirstLetter.length > 1
        ? await fetch(`${API_URL}/search.php?s=${mealFirstLetter}`)
        : await fetch(`${API_URL}/search.php?f=${mealFirstLetter}`);

    // 2) throw an error message if the res.ok is false
    if (!res.ok) throw new Error('There is no such recipe 😉, Try again');

    // 3) convert the data to a json format
    const data = await res.json();

    // 4) destructure meals from data received
    const { meals } = data;

    // 5) if the meals received is null set state.meals to an empty array
    if (meals === null) {
      state.meals = [];
      throw new Error('There is no such recipe 😉, Try again');
    }

    // 6) deleting the previous recipe from meals array
    state.meals.splice(0);

    // 7) push the meals inside meals array
    state.meals.push(...meals);

    // 8) store the query the user enter to state object
    state.search.query = mealFirstLetter;
  } catch (err) {
    throw err;
  }
};

export const randomMeal = async function () {
  try {
    // 1) fetch data from an api
    const res = await fetch(`${API_URL}/random.php`);

    // 2) throw an error message if the res.ok is false
    if (!res.ok)
      throw new Error('There is no such random recipe 😉, Try again');

    // 3) convert the data to a json format
    const data = await res.json();

    // 4) destructure meals from data received
    const { meals } = data;

    // 6) deleting the previous recipe from meals array
    state.meals.splice(0);

    // 7) push the meals inside meals array
    state.meals.push(...meals);
  } catch (err) {
    throw err;
  }
};
