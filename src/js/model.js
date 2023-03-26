import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

// for hadelling all the data
export const state = {
  recipe: {},
};

// This function will change the state object
export const loadRecipe = async function (id) {
  try {
    // it will return the promise
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);

    //destructure
    const { recipe } = data.data;

    //define the data to own key
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // temporary error handeling
    console.log(`${err} =>model error `);
    throw err;
  }
};

//search func will export to controller and call by controller
export const loadSearchResultes=async ()=>{
  try {
    
  } catch (error) {
    throw err;
  }
}
