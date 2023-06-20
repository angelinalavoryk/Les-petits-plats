import { recipes } from './data/recipes.js';
import { recipesFactory } from './utils/factoryRecipes.js';


let filteredRecipes = recipes;
const initialRecipes = recipes;
let filteredAppliances = [];
let filteredUstensils = [];
const recipesSection = document.querySelector('.row');
const messageError = document.querySelector('.messageError');




//Afficher les recettes
function displayFilteredRecipes(filteredRecipes) {
  recipesSection.innerHTML = '';
  // Ajouter les cartes des recettes filtrées à la section
  filteredRecipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
  if (filteredAppliances.length > 0 || filteredUstensils.length > 0) {
    const recipeCards = recipesSection.querySelectorAll('.recipe-card');
    recipeCards.forEach((card) => {
      const appliance = card.dataset.appliance.toLowerCase();
      const ustensils = card.dataset.ustensils.toLowerCase();
      const shouldHide =
        (filteredAppliances.length > 0 && !filteredAppliances.includes(appliance)) ||
        (filteredUstensils.length > 0 && !ustensils.split(',').some((utensil) => filteredUstensils.includes(utensil.trim())));
      if (shouldHide) {
        card.style.display = 'none';
      }
    });
  }
}



function displayData(recipes) {
  recipesSection.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}


// Fonction d'initialisation
function init() {
  displayData(initialRecipes);
}
init();



// Gestionnaire d'événement pour la recherche de recettes
const input = document.querySelector('.search_input');
input.addEventListener('input', searchRecipes);



function searchRecipes() {
  const searchText = input.value.trim().toLowerCase();
  // Réinitialiser les filtres et cacher le message d'erreur si la recherche est trop courte
  if (searchText.length < 3) {
    filteredRecipes = initialRecipes;
    displayFilteredRecipes(filteredRecipes);
    resetFilters();
    hideMessageError();
    return;
  }
  // Filtrer les recettes selon le texte de recherche
  filteredRecipes = initialRecipes.filter(
    (recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchText)
      ) ||
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText)
  );
  displayFilteredRecipes(filteredRecipes);
  // Afficher le message d'erreur si aucune recette ne correspond aux critères de recherche
  if (filteredRecipes.length === 0) {
    showMessageError();
  } else {
    hideMessageError();
  }
}




// Réinitialiser les filtres
function resetFilters() {
  const filterInputs = document.querySelectorAll('.input-ingredient, .input-appliance, .input-ustensil');
  filterInputs.forEach((input) => {
    input.value = '';
  });
}




// Réinitialiser les recettes
function resetRecipes() {
  const searchText = input.value.trim().toLowerCase();
  // Réinitialiser les filtres et cacher le message d'erreur si la recherche est trop courte
  const ingredientTag = tagIngredients.style.display !== 'none' ? tagIngredients.textContent.toLowerCase() : '';
  filteredRecipes = initialRecipes.filter((recipe) => {
    const hasSearchText =
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText);
    const hasIngredientTag = ingredientTag === '' || recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(ingredientTag));
    const hasApplianceTag = filteredAppliances.length === 0 || filteredAppliances.includes(recipe.appliance.toLowerCase());
    const hasUstensilTag = filteredUstensils.length === 0 || recipe.ustensils.some((utensil) => filteredUstensils.includes(utensil.toLowerCase()));
    return hasSearchText && hasIngredientTag && hasApplianceTag && hasUstensilTag;
  });

  displayFilteredRecipes(filteredRecipes);
}




// Afficher/masquer le message d'erreur
function showMessageError() {
  messageError.style.display = 'block';
}
function hideMessageError() {
  messageError.style.display = 'none';
}







// Gestion des filtres (Ingrédients, Appareils, Ustensiles)

const filters = document.querySelectorAll('.filter');
filters.forEach(filter => {
   // gestionnaire d'événements "click" à chaque élément "filter"
  filter.addEventListener('click', toggleFilterInput);
});


// gestion des clics pour masquer les filtres
document.addEventListener('click', (event) => {
  const dropdowns = document.querySelectorAll('.filter');
  dropdowns.forEach((dropdown) => {
    // Vérifier si l'élément cliqué n'est pas le filtre actuellement ouvert
    if (dropdown !== event.target.closest('.filter')) {
      // Masquer le filtre
      dropdown.classList.remove('open');
      const input = dropdown.querySelector('input');
      const span = dropdown.querySelector('span');
      const arrow = dropdown.querySelector('.arrow');
      const list = dropdown.querySelector('ul');
      input.style.display = 'none';
      span.style.display = 'block';
      arrow.classList.remove('arrow-up');
      list.classList.add('closed');
    }
  });
});



// affichage du filtre
function toggleFilterInput(event) {
  const filter = event.currentTarget;
  const dropdown = filter.closest('.filter');
  const input = dropdown.querySelector('input');
  const span = dropdown.querySelector('span');
  const arrow = dropdown.querySelector('.arrow');
  const list = dropdown.querySelector('ul');

  if (input.style.display === 'none') {
    input.style.display = 'block';
    span.style.display = 'none';
    dropdown.classList.add('open');
    arrow.classList.add('arrow-up');
    list.classList.remove('closed');

    input.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  } else {
    // Masquer l'élément "input" et afficher l'élément "span"
    input.style.display = 'none';
    span.style.display = 'block';
    dropdown.classList.remove('open');
    arrow.classList.remove('arrow-up');
    list.classList.add('closed');
  }
}

// Ingrédients
const ingredientList = document.querySelector('#ingredient-list');
const ingredientFilterLabel = document.querySelector('#ingredient-filter-label');

ingredientFilterLabel.addEventListener('click', showIngredientList);

function showIngredientList() {
  const searchText = inputIngredients.value.trim().toLowerCase();
  ingredientList.innerHTML = '';
// Obtenir tous les ingrédients des recettes filtrées
  const allIngredients = filteredRecipes.flatMap(recipe => recipe.ingredients);
  const ingredientsMap = new Map();

  allIngredients.forEach(ingredient => {
    const ingredientName = ingredient.ingredient.toLowerCase();
    if (ingredientName.includes(searchText)) {
      const count = ingredientsMap.get(ingredientName) || 0;
      ingredientsMap.set(ingredientName, count + 1);
    }
  });
// Trier les ingrédients de manière alphabétique
  const uniqueIngredients = Array.from(ingredientsMap.keys()).sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
// Ajouter les ingrédients à la liste avec des gestionnaires d'événements
  uniqueIngredients.forEach(ingredientName => {
    const li = document.createElement('li');
    const capitalizedIngredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
    li.textContent = capitalizedIngredientName;
    ingredientList.appendChild(li);
    li.addEventListener('click', () => {
      addIngredientTag(capitalizedIngredientName);
      applyIngredientFilter(ingredientName);
      resetFilters();
      hideMessageError();
    });
  });
}

//fermeture de la liste d'ingrédients
document.addEventListener('click', (event) => {
  if (!event.target.closest('#ingredient-list') && !event.target.closest('.filter--ingredient')) {
    ingredientList.classList.add('closed');
  }
});

// Recherche des ingrédients
const inputIngredients = document.querySelector('.input-ingridients');
inputIngredients.addEventListener('input', searchIngredients);

function searchIngredients() {
  const searchText = inputIngredients.value.trim().toLowerCase();
  const ingredientItems = ingredientList.querySelectorAll('li');

  ingredientItems.forEach((item) => {
    const ingredientName = item.textContent.toLowerCase();
    if (ingredientName.includes(searchText)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
// gestion des événements pour la fermeture de la liste d'ingrédients et la réinitialisation du filtre
document.addEventListener('click', (event) => {
  if (!event.target.closest('#ingredient-list') && !event.target.closest('.filter--ingredient')) {
    ingredientList.classList.add('closed');
    resetIngredientFilter();
  }
});

// Réinitialisation du filtre d'ingrédients
function resetIngredientFilter() {
  inputIngredients.value = '';
  const ingredientItems = ingredientList.querySelectorAll('li');
  ingredientItems.forEach((item) => {
    item.style.display = 'block';
  });
}




// Appareils
const applianceList = document.querySelector('#appliance-list');
const applianceFilterLabel = document.querySelector('#appliance-filter-label');
applianceFilterLabel.addEventListener('click', showApplianceList);

function showApplianceList() {
  const searchText = inputAppliance.value.trim().toLowerCase();
  applianceList.innerHTML = '';

  const allAppliances = filteredRecipes.flatMap(recipe => recipe.appliance.toLowerCase());
  const uniqueAppliances = [...new Set(allAppliances)];

  uniqueAppliances.forEach(applianceName => {
    const capitalizedApplianceName = applianceName.charAt(0).toUpperCase() + applianceName.slice(1);
    if (capitalizedApplianceName.includes(searchText)) {
      const li = document.createElement('li');
      li.textContent = capitalizedApplianceName;
      applianceList.appendChild(li);

      li.addEventListener('click', () => {
        addApplianceTag(capitalizedApplianceName);
        applyApplianceFilter(applianceName);
        resetFilters();
        hideMessageError();
      });
    }
  });
}

const inputAppliance = document.querySelector('.input-appliance');
inputAppliance.addEventListener('input', searchAppliances);

function searchAppliances() {
  const searchText = inputAppliance.value.trim().toLowerCase();
  const applianceItems = applianceList.querySelectorAll('li');

  applianceItems.forEach((item) => {
    const applianceName = item.textContent.toLowerCase();
    if (applianceName.startsWith(searchText)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('#appliance-list') && !event.target.closest('.filter--appliance')) {
    applianceList.classList.add('closed');
    resetApplianceFilter();
  }
});

function resetApplianceFilter() {
  inputAppliance.value = '';
  const applianceItems = applianceList.querySelectorAll('li');
  applianceItems.forEach((item) => {
    item.style.display = 'block';
  });
}





// Ustensiles
const ustensilList = document.querySelector('#ustensil-list');
const ustensilFilterLabel = document.querySelector('#ustensil-filter-label');
ustensilFilterLabel.addEventListener('click', showUstensilList);

function showUstensilList() {
  const searchText = inputUstensil.value.trim().toLowerCase();
  ustensilList.innerHTML = '';

  const allUstensils = filteredRecipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()));
  const uniqueUstensils = [...new Set(allUstensils)];

  uniqueUstensils.forEach(ustensilName => {
    const capitalizedUstensilName = ustensilName.charAt(0).toUpperCase() + ustensilName.slice(1);
    if (capitalizedUstensilName.includes(searchText)) {
      const li = document.createElement('li');
      li.textContent = capitalizedUstensilName;
      ustensilList.appendChild(li);

      li.addEventListener('click', () => {
        addUstensilsTag(capitalizedUstensilName);
        applyUstensilsFilter(ustensilName);
        resetFilters();
        hideMessageError();
      });
    }
  });
}

const inputUstensil = document.querySelector('.input-ustensil');
inputUstensil.addEventListener('input', searchUstensils);

function searchUstensils() {
  const searchText = inputUstensil.value.trim().toLowerCase();
  const ustensilItems = ustensilList.querySelectorAll('li');

  ustensilItems.forEach((item) => {
    const ustensilName = item.textContent.toLowerCase();
    if (ustensilName.startsWith(searchText)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('#ustensil-list') && !event.target.closest('.filter--ustensil')) {
    ustensilList.classList.add('closed');
    resetUstensilFilter();
  }
});

function resetUstensilFilter() {
  inputUstensil.value = '';
  const ustensilItems = ustensilList.querySelectorAll('li');
  ustensilItems.forEach((item) => {
    item.style.display = 'block';
  });
}








// Gestionnaore des tags

const tagsSection = document.querySelector('.tags');
const tagIngredients = document.querySelector('.tagIngridients');
const tagAppliance = document.querySelector('.tagAppliance');
const tagUstensils = document.querySelector('.tagUstensil');
const closeTagIngridient = document.querySelector('.closeIngredientTag');
const closeTagAppliance = document.querySelector('.closeApplianceTag');
const closeTagUstensils = document.querySelector('.closeUstensilsTag');





// Supprimer le tag d'ingrédient , appareils, ustensils
function removeIngredientTag() {
  tagIngredients.style.display = 'none';
  filteredAppliances = [];
  filteredUstensils = [];
  resetRecipes();
}
export function removeApplianceTag() {
  tagAppliance.style.display = 'none';
  filteredAppliances = [];
  resetRecipes();
}
function removeUstensilsTag() {
  tagUstensils.style.display = 'none';
  filteredUstensils = [];
  resetRecipes();
}





// Ajouter un tag d'ingrédient, appareils, ustensils
function addIngredientTag(ingredient) {
  tagIngredients.textContent = ingredient;
  tagIngredients.style.display = 'flex';
  tagIngredients.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle close closeIngredientTag" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
  closeTagIngridient.addEventListener('click', () => {
    removeIngredientTag();
    applyIngredientFilter('');
  });
}

function addApplianceTag(appliance) {
  tagAppliance.textContent = appliance;
  tagAppliance.style.display = 'flex';
  tagAppliance.innerHTML +=
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle close closeApplianceTag" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
  closeTagAppliance.addEventListener('click', () => {
    removeApplianceTag();
    applyApplianceFilter('');
  });
}

function addUstensilsTag(ustensil) {
  tagUstensils.textContent = ustensil;
  tagUstensils.style.display = 'flex';
  tagUstensils.innerHTML +=
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle close closeUstensilsTag" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
  closeTagUstensils.addEventListener('click', () => {
    removeUstensilsTag();
    applyUstensilsFilter('');
  });
}






// Appliquer le filtre d'ingrédient, appareils, ustensils
function applyIngredientFilter(ingredient) {
  const searchText = input.value.trim().toLowerCase();
  filteredAppliances = [];
  filteredUstensils = [];

  filteredRecipes = initialRecipes.filter((recipe) => {
    const hasSearchText =
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText);
    const hasIngredientTag = recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(ingredient)
    );
    return hasSearchText && hasIngredientTag;
  });

  displayFilteredRecipes(filteredRecipes);
}

function applyApplianceFilter(appliance) {
  const searchText = input.value.trim().toLowerCase();
  filteredAppliances = [appliance];

  filteredRecipes = initialRecipes.filter((recipe) => {
    const hasSearchText =
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText);
    const hasApplianceTag =
      recipe.appliance.toLowerCase() === appliance;
    const hasUstensilTag =
      filteredUstensils.length === 0 ||
      recipe.ustensils.some((utensil) =>
        filteredUstensils.includes(utensil.toLowerCase())
      );
    return (
      hasSearchText &&
      hasApplianceTag &&
      hasUstensilTag
    );
  });

  displayFilteredRecipes(filteredRecipes);
}

function applyUstensilsFilter(ustensil) {
  const searchText = input.value.trim().toLowerCase();
  filteredUstensils = [ustensil];

  filteredRecipes = initialRecipes.filter((recipe) => {
    const hasSearchText =
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText);
    const hasApplianceTag =
      filteredAppliances.length === 0 ||
      recipe.appliance.toLowerCase() ===
        filteredAppliances[0];
    const hasUstensilTag = recipe.ustensils.some((utensil) =>
      utensil.toLowerCase() === ustensil
    );
    return (
      hasSearchText &&
      hasApplianceTag &&
      hasUstensilTag
    );
  });

  if (filteredAppliances.length === 0) {
    filteredAppliances = []; // Réinitialisation du filtre "appareils" lorsque vide
  }

  displayFilteredRecipes(filteredRecipes);
}




closeTagIngridient.addEventListener('click', () => {
  removeIngredientTag();
});
closeTagAppliance.addEventListener('click', () => {
  removeApplianceTag();
});
closeTagUstensils.addEventListener('click', () => {
  removeUstensilsTag();
});




// Gestion des événements pour la suppression du tag d'ingrédient, appareilsn ustensils
tagIngredients.addEventListener('click', () => {
  removeIngredientTag();
});
tagAppliance.addEventListener('click', () => {
  removeApplianceTag();
});
tagUstensils.addEventListener('click', () => {
  removeUstensilsTag();
});


















































  

