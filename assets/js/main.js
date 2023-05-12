'use strict'
document.addEventListener('DOMContentLoaded', init);

const menuTypes = document.querySelector('#menuTypes');
const foodArticlesHeader = document.querySelector(`#foodItemsHeader`)
const foodArticles = document.querySelector('#foodItems');
const backButton = document.querySelector('.back');

function init() {
    addEventListeners()
    loadMenuTypes()
}

function addEventListeners() {
    backButton.addEventListener('click', goToStart)

}

function goToStart(){
    console.log('go back')
}

function selectType(type) {
    document.querySelectorAll(`#menuTypes li`).forEach(
        li_type => {
            if (li_type === type) {
                li_type.classList.add("selected")
            } else {
                li_type.classList.remove("selected")
            }
        }
    )
}

function loadMenuTypes() {
    fetch('../assets/data/menu.json')
        .then(response => response.json())
        .then(menuItems => {
            const uniqueTypes = getUniqueTypes(menuItems);

            // Create list items for menu types
            uniqueTypes.forEach(type => {
                const listItem = document.createElement('li');
                listItem.textContent = type;
                listItem.addEventListener('click', function() {
                    displayMenuItemsByType(type, menuItems);
                });
                menuTypes.appendChild(listItem);
            });
            document.querySelectorAll(`#menuTypes li`).forEach(type => {
                type.addEventListener('click', function() {
                    selectType(type);
                });
            });
        })
        .catch(error => console.log(error));
}

function displayMenuItemsByType(type, menuItems) {
    foodArticlesHeader.innerHTML = type;
    foodArticles.innerHTML = ''

    menuItems.forEach(item => {
        if (item.type === type) {
            const menuItem = document.createElement('article');
            const menuName = document.createElement('h4');
            const menuImage = document.createElement("img");
            const menuPrice = document.createElement('p');

            menuName.textContent = item.name;
            menuPrice.textContent = item.cost;
            menuImage.src = `../assets/media/${item.image}`;

            menuItem.appendChild(menuName);
            menuItem.appendChild(menuImage);
            menuItem.appendChild(menuPrice);
            menuItem.addEventListener('click', function () {
                addFoodToList(item);
            })
            foodArticles.appendChild(menuItem)
        }
    })
}

function getUniqueTypes(menuItems) {
    const typesSet = new Set();
    menuItems.forEach(item => {
        typesSet.add(item.type);
    });
    return Array.from(typesSet);
}

function addFoodToList(foodItem) {
    console.log(foodItem);
}
