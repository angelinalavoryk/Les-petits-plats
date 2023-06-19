import { recipes } from './data/recipes.js';
import { recipesFactory } from './utils/factoryRecipes.js';

let filteredRecipes = recipes;
const initialRecipes = recipes;

const recipesSection = document.querySelector('.row');
const messageError = document.querySelector('.messageError');

function displayData(recipes) {
  recipesSection.innerHTML = '';
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  }
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
  
  const matchingRecipes = [];
  for (let i = 0; i < initialRecipes.length; i++) {
    const recipe = initialRecipes[i];
    const ingredientsMatch = recipe.ingredients.some(function (ingredient) {
      return ingredient.ingredient.toLowerCase().includes(searchText);
    });
    const nameMatch = recipe.name.toLowerCase().includes(searchText);
    const descriptionMatch = recipe.description.toLowerCase().includes(searchText);
    
    if (ingredientsMatch || nameMatch || descriptionMatch) {
      matchingRecipes.push(recipe);
    }
  }
  
  filteredRecipes = matchingRecipes;
  displayFilteredRecipes(filteredRecipes);
  if (filteredRecipes.length === 0) {
    showMessageError();
  } else {
    hideMessageError();
  }
}


function resetFilters() {
  const filterInputs = document.querySelectorAll('.input-ingredient, .input-appliance, .input-ustensil');
  for (let i = 0; i < filterInputs.length; i++) {
    const input = filterInputs[i];
    input.value = '';
  }
}

export function displayFilteredRecipes(filteredRecipes) {
  recipesSection.innerHTML = '';
  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  }
}

function showMessageError() {
  messageError.style.display = 'block';
}

function hideMessageError() {
  messageError.style.display = 'none';
}
