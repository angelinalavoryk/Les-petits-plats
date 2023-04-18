async function getData() {
    const response = await fetch('./scripts/recipes.json');
    const data = await response.json();
    const { recipes } = data;
    return recipes;
  }
  
  async function displayData(recipes) {
    const recipesSection = document.querySelector(".cards");
  
    recipes.forEach((recipe) => {
      const recipeModel = recipesFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipesSection.appendChild(recipeCardDOM);
    });
  }
  
  async function init() {
    const recipes = await getData();
    displayData(recipes);
  }
  init();
  
  function recipesFactory(data) {
    const { id, name, servings, ingredients, time, description } = data;
  
    function getRecipeCardDOM() {
      const recipeCardElement = document.createElement('article');
      recipeCardElement.classList.add('card_container');
      
      const recipeLinkElement = document.createElement('a');
      recipeLinkElement.classList.add('card_link');
      recipeLinkElement.href = `recipes.html?id=${id}`;
      recipeCardElement.appendChild(recipeLinkElement);

      const recipeBgElement = document.createElement('div');
      recipeBgElement.classList.add('card_bg');
      recipeLinkElement.appendChild(recipeBgElement);

      const recipeBodyElement = document.createElement('div');
      recipeBodyElement.classList.add('card_body');
      recipeLinkElement.appendChild(recipeBodyElement);

      const recipeHeadElement = document.createElement('div');
      recipeHeadElement.classList.add('card_head');
      recipeBodyElement.appendChild(recipeHeadElement);

      const recipeNameElement = document.createElement('h2');
      recipeNameElement.classList.add('recipe_name');
      recipeNameElement.textContent = name;
      recipeHeadElement.appendChild(recipeNameElement);

      const recipeTimeElement = document.createElement('div');
      recipeTimeElement.classList.add('card_time');
      recipeHeadElement.appendChild(recipeTimeElement);

      const recipeIconeTimeElement = document.createElement('i');
      recipeIconeTimeElement.classList.add('card_time_icone');
      recipeTimeElement.appendChild(recipeIconeTimeElement);

      const recipeMinutesElement = document.createElement('p');
      recipeMinutesElement.classList.add('card_time_minutes');
      recipeMinutesElement.textContent = `${time} minutes`;
      recipeTimeElement.appendChild(recipeMinutesElement);

      const recipeCardContentElement = document.createElement('div');
      recipeCardContentElement.classList.add('card_content');
      recipeBodyElement.appendChild(recipeCardContentElement);

      const recipeCardIndigrientsElement = document.createElement('ul');
      recipeCardIndigrientsElement.classList.add('card_indigrients');
      recipeCardContentElement.appendChild(recipeCardIndigrientsElement);
      ingredients.forEach((ingredient) => {
        const recipeCardIndigrientsLiElement = document.createElement('li');
        recipeCardIndigrientsLiElement.classList.add('card_indigrients-li');
        recipeCardIndigrientsLiElement.textContent = `${ingredient.ingredient} - ${ingredient.quantity} ${ingredient.unit || ''}`;
        recipeCardIndigrientsElement.appendChild(recipeCardIndigrientsLiElement);
      });

      const recipeIndigrientsDescriptionElement = document.createElement('p');
      recipeIndigrientsDescriptionElement.classList.add('card_indigrients-description');
      recipeIndigrientsDescriptionElement.textContent = description;
      recipeCardContentElement.appendChild(recipeIndigrientsDescriptionElement);

      return recipeCardElement;
    }
    return { name, getRecipeCardDOM };
  }
  


