import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
// polllyfill for async await
import 'regenerator-runtime/runtime';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// spinner

const controllRecipe = async () => {
  try {
    // to get the id and fetch the data acc. to it
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    console.log(id);
    recipeView.renderSpiner();
    //1
    //loading the recipe
    //as loadrecipe is a async function it will retun a promise
    //so do async
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2
    // rendering the recipe
    // pass data to method rather than  to the object
    recipeView.render(model.state.recipe);

    // recipeContainer.innerHTML = htmlInner;
  } catch (err) {
    alert(err);
  }
};

// if we refresh the data will not show beacuse we addevent in hash change and the hash is not change in refresh solution is use load event
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//we can also write the same code as
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controllRecipe)
);
