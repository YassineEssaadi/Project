// Array to store recipes
let recipes = [];

// Form elements
const form = document.getElementById('recipe-form');
const recipeTitle = document.getElementById('recipe-title');
const recipeIngredients = document.getElementById('recipe-ingredients');
const recipeInstructions = document.getElementById('recipe-instructions');
const recipeImage = document.getElementById('recipe-image');
const recipeList = document.getElementById('recipes');
const modal = document.getElementById('recipe-modal');
const modalContent = document.getElementById('modal-recipe-details');
const closeModal = document.querySelector('.close-btn');

// Add recipe event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageFile = recipeImage.files[0];
    if (!imageFile) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const recipe = {
            title: recipeTitle.value,
            ingredients: recipeIngredients.value.split(',').map(ing => ing.trim()),
            instructions: recipeInstructions.value,
            image: reader.result
        };

        recipes.push(recipe);
        form.reset();
        displayRecipes();
    };

    reader.readAsDataURL(imageFile);
});

// Display recipes
function displayRecipes() {
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('li');

        recipeItem.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" data-index="${index}">
            <h3>${recipe.title}</h3>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        recipeList.appendChild(recipeItem);
    });

    // Add click event for images
    recipeList.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            showModal(index);
        });
    });

    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteRecipe(index);
        });
    });
}

// Show modal
function showModal(index) {
    const recipe = recipes[index];

    modalContent.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height: auto; border-radius: 8px;">
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;

    modal.style.display = 'flex';
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Delete recipe
function deleteRecipe(index) {
    recipes.splice(index, 1); // Remove recipe from the array
    displayRecipes(); // Re-render the recipe list
}
