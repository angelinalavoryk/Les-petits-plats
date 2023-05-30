export function recipesFactory(data) {
    const { id, name, servings, ingredients, time, description } = data;
  
    function getRecipeCardDOM() {        
        const recipeCardElement = document.createElement('article');
        recipeCardElement.classList.add('col-md-4', 'articles-cards');
    
        const recipeCardStyleElement = document.createElement('div');
        recipeCardStyleElement.classList.add('card-style');
        recipeCardElement.appendChild(recipeCardStyleElement);
    
        const recipeBgElement = document.createElement('div');
        recipeBgElement.classList.add('card-img-top');
        recipeCardStyleElement.appendChild(recipeBgElement);
    
        const recipeBodyElement = document.createElement('div');
        recipeBodyElement.classList.add('card-body');
        recipeCardStyleElement.appendChild(recipeBodyElement);
    
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

            const ingredientNameElement = document.createElement('span');
            ingredientNameElement.style.fontWeight = 'bold';
            ingredientNameElement.textContent = ingredient.ingredient;
            recipeCardIndigrientsLiElement.appendChild(ingredientNameElement);

            if (ingredient.quantity) {
                const ingredientSeparatorElement = document.createTextNode(': ');
                recipeCardIndigrientsLiElement.appendChild(ingredientSeparatorElement);

                const ingredientQuantityElement = document.createTextNode(`${ingredient.quantity} ${ingredient.unit || ''}`);
                recipeCardIndigrientsLiElement.appendChild(ingredientQuantityElement);
            }

            recipeCardIndigrientsElement.appendChild(recipeCardIndigrientsLiElement);

        });
        const recipeIndigrientsDescriptionElement = document.createElement('p');
        recipeIndigrientsDescriptionElement.classList.add('card_indigrients-description');
        recipeIndigrientsDescriptionElement.textContent = description;
        recipeCardContentElement.appendChild(recipeIndigrientsDescriptionElement);

        return recipeCardElement;
    }
  
    return {getRecipeCardDOM };
}


