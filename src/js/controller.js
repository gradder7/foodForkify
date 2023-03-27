import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
// polllyfill for async await
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView, { PaginationView } from './views/paginationView';

// from parcel
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2
// controll recipe View
const controllRecipe = async () => {
  try {
    // to get the id and fetch the data acc. to it
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    // console.log(id);
    recipeView.renderSpiner();
    //1>loading the recipe
    //as loadrecipe is a async function it will retun a promise
    //so do async
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2>rendering the recipe
    // pass data to method rather than  to the object
    recipeView.render(model.state.recipe);

    // recipeContainer.innerHTML = htmlInner;
  } catch (err) {
    recipeView.renderError();
  }
};
// controll search
// it does not retun anything
//it just manipulate the state
const controllSearch = async () => {
  try {
    resultsView.renderSpiner();
    // console.log(resultsView);

    //1> get the search query
    const query = searchView.getQuery();
    if (!query) return;
    //2> load search results
    await model.loadSearchResults(query);
    //3> Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));
    //4> render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controllPagination = goToPage => {
  console.log(goToPage);
  //1> Render new results
  //render will clear every thing and than render new markup
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4> render new pagination buttons
  paginationView.render(model.state.search);
};

// if we refresh the data will not show beacuse we addevent in hash change and the hash is not change in refresh solution is use load event
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//we can also write the same code as
// ['hashchange', 'load'].forEach(event =>
//   window.addEventListener(event, controllRecipe)
// );

// publisher and subsciber pattern here i will pass the function of controller as args to the view for event handeling
// as soon as the program start the init will run and will run the  addHandlerRender
const init = () => {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearch(controllSearch);
  paginationView.addHandlerClick(controllPagination);
};
init();
