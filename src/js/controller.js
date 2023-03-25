import icons from '../img/icons.svg';
import 'core-js/stable';
// polllyfill for async await
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');
console.log(icons);

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
const loadingSpinner = parentEle => {
  const htmlInner = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
  parentEle.innerHTML = '';
  parentEle.insertAdjacentHTML('afterbegin', htmlInner);
};
const showRecipe = async () => {
  try {
    // to get the id and fetch the data acc. to it
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    console.log(id);
    //loading the recipe
    loadingSpinner(recipeContainer);

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    console.log(res, data);
    //destructure
    let recipe = data.data.recipe;

    //define the data to own key
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
    //2
    // rendering the recipe
    const htmlInner = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map((val, index) => {
              return `      
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${val.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${val.unit}</span>
                  ${val.description}
                </div>
              </li>`;
            })
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    // clear the recipe container
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', htmlInner);
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
  window.addEventListener(event, showRecipe)
);
