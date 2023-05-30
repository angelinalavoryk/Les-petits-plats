import { recipes } from './data/recipes.js';
import { recipesFactory } from './utils/factoryRecipes.js';

export let filteredRecipes = recipes;
const initialRecipes = recipes;

const recipesSection = document.querySelector('.row');
const messageError = document.querySelector('.messageError');

export function displayData(recipes) {
  recipesSection.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}


function init() {
  displayData(initialRecipes); // Afficher les recettes initiales
}
init();

// search bar
const input = document.querySelector('.search_input');
input.addEventListener('input', searchRecipes);


function searchRecipes() {
  const searchText = input.value.trim().toLowerCase();
  if (searchText.length < 3) {
    filteredRecipes = initialRecipes;
    displayFilteredRecipes(filteredRecipes);
    resetFilters();
    hideMessageError();
    return;
  }
  filteredRecipes = initialRecipes.filter(
    (recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchText)
      ) ||
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText)
  );
  displayFilteredRecipes(filteredRecipes);
  if (filteredRecipes.length === 0) {
    showMessageError();
  } else {
    hideMessageError();
  }
}



function resetFilters() {
  const filterInputs = document.querySelectorAll('.input-ingredient, .input-appliance, .input-ustensil');
  filterInputs.forEach((input) => {
    input.value = '';
  });
}

export function displayFilteredRecipes(filteredRecipes) {
  recipesSection.innerHTML = '';
  filteredRecipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function showMessageError() {
  messageError.style.display = 'block';
}

function hideMessageError() {
  messageError.style.display = 'none';
}














































// function searchRecipes() {
//   const searchText = input.value.trim().toLowerCase();
//   if (searchText.length < 3) {
//     displayData(initialRecipes);
//     hideMessageError();
//     return;
//   }
//   filteredRecipes = initialRecipes.filter(
//     (recipe) =>
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(searchText)
//       ) ||
//       recipe.name.toLowerCase().includes(searchText) ||
//       recipe.description.toLowerCase().includes(searchText)
//   );
//   displayFilteredRecipes(filteredRecipes);
//   if (filteredRecipes.length === 0) {
//     showMessageError();
//   } else {
//     hideMessageError();
//   }
// }






































  

