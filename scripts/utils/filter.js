import { filteredRecipes } from "../index.js";
import { displayFilteredRecipes } from "../index.js";


// Filters
const ingredientFilter = document.querySelector('.filter--ingredient');
ingredientFilter.addEventListener('click', toggleFilterInput);

const applianceFilter = document.querySelector('.filter--appliance');
applianceFilter.addEventListener('click', toggleFilterInput);

const ustensilFilter = document.querySelector('.filter--ustensil');
ustensilFilter.addEventListener('click', toggleFilterInput);

document.addEventListener('click', (event) => {
  const dropdowns = document.querySelectorAll('.filter');
  dropdowns.forEach((dropdown) => {
    if (dropdown !== event.target.closest('.filter')) {
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

function toggleFilterInput(event) {
  const filter = event.currentTarget;
  const dropdown = filter.closest('.filter');
  const input = dropdown.querySelector('input');
  const span = dropdown.querySelector('span');
  const arrow = dropdown.querySelector('.arrow');
  const list = dropdown.querySelector('ul');

  // Si l'input est caché, affiche-le et masque le span
  if (input.style.display === 'none') {
    input.style.display = 'block';
    span.style.display = 'none';
    dropdown.classList.add('open');
    arrow.classList.add('arrow-up');
    list.classList.remove('closed');

    // Empêcher la propagation de l'événement de clic sur l'input
    input.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  } 
  // Sinon, masque l'input et affiche le span
  else {
    input.style.display = 'none';
    span.style.display = 'block';
    dropdown.classList.remove('open');
    arrow.classList.remove('arrow-up');
    list.classList.add('closed');
  }
}
const filters = document.querySelectorAll('.filter');
filters.forEach(filter => {
  filter.addEventListener('click', toggleFilterInput);
});




//ingrédients
const ingredientList = document.querySelector('#ingredient-list');


const ingredientFilterLabel = document.querySelector('#ingredient-filter-label');
ingredientFilterLabel.addEventListener('click', showIngredientList);

// function showIngredientList() {
//   const searchText = inputIngredients.value.trim().toLowerCase();
//   ingredientList.innerHTML = '';

//   const allIngredients = filteredRecipes.flatMap(recipe => recipe.ingredients);
//   const ingredientsMap = new Map();
  
//   allIngredients.forEach(ingredient => {
//     const ingredientName = ingredient.ingredient.toLowerCase();
//     if (ingredientName.includes(searchText)) {
//       const count = ingredientsMap.get(ingredientName) || 0;
//       ingredientsMap.set(ingredientName, count + 1);
//     }
//   });

//   const uniqueIngredients = Array.from(ingredientsMap.keys()).sort((a, b) =>
//     a.localeCompare(b, 'fr', { sensitivity: 'base' })
//   );
  
//   uniqueIngredients.forEach(ingredientName => {
//     const li = document.createElement('li');
//     const capitalizedIngredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
//     li.textContent = capitalizedIngredientName;
//     ingredientList.appendChild(li);
//   });
// }

function showIngredientList() {
  const searchText = inputIngredients.value.trim().toLowerCase();
  ingredientList.innerHTML = '';

  const allIngredients = filteredRecipes.flatMap(recipe => recipe.ingredients);
  const ingredientsMap = new Map();

  allIngredients.forEach(ingredient => {
    const ingredientName = ingredient.ingredient.toLowerCase();
    if (ingredientName.includes(searchText)) {
      const count = ingredientsMap.get(ingredientName) || 0;
      ingredientsMap.set(ingredientName, count + 1);
    }
  });

  const uniqueIngredients = Array.from(ingredientsMap.keys()).sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );

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




document.addEventListener('click', (event) => {
  if (!event.target.closest('#ingredient-list') && !event.target.closest('.filter--ingredient')) {
    ingredientList.classList.add('closed');
  }
});

//search filter ingridient input
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
//réanitialiser après fermeture
document.addEventListener('click', (event) => {
  if (!event.target.closest('#ingredient-list') && !event.target.closest('.filter--ingredient')) {
    ingredientList.classList.add('closed');
    resetIngredientFilter();
  }
});
function resetIngredientFilter() {
  inputIngredients.value = '';
  const ingredientItems = ingredientList.querySelectorAll('li');
  ingredientItems.forEach((item) => {
    item.style.display = 'block';
  });
}


//appareils
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
    }
  });
}

//search appliance input
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
//réanitialiser après fermeture
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
  }
  });
  }

//search ustensil input
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
//réanitialiser après fermeture
document.addEventListener('click', (event) => {
  if (!event.target.closest('#ustensil-list') && !event.target.closest('.filter--ustensil')) {
    ustensilList.classList.add('closed');
    resetUstensilFilter();
  }
});
function resetUstensilFilter() {
  inputUstensil.value = '';
  const ustensilItems = applianceList.querySelectorAll('li');
  ustensilItems.forEach((item) => {
    item.style.display = 'block';
  });
}



// les tags
const tagsSection = document.querySelector('.tags');
const tagIngredients = document.querySelector('.tagIngridients');
const tagAppliance = document.querySelector('.tagAppliance');
const tagUstensils = document.querySelector('.tagUstensil');
const closeTagIngridient = document.querySelector('.closeIngredientTag');
const closeTagAppliance = document.querySelector('.closeApplianceTag');
const closeTagUstensils = document.querySelector('.closeUstensilsTag');

// Supprimer les tags
function removeIngredientTag() {
  tagIngredients.style.display = 'none';
}
function removeApplianceTag() {
  tagAppliance.style.display = 'none';
}
function removeUstensilsTag() {
  tagUstensils.style.display = 'none';
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

function addIngredientTag(ingredient) {
  tagIngredients.textContent = ingredient;
  tagIngredients.style.display = 'flex';
  tagIngredients.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle close closeIngredientTag" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
  closeTagIngridient.addEventListener('click', () => {
    removeIngredientTag();
    applyIngredientFilter('');
  });
}

tagIngredients.addEventListener('click', () => {
  removeIngredientTag();
});
