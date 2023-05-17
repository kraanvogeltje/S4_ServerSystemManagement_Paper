'use strict'
document.addEventListener('DOMContentLoaded', init);

const menuTypes = document.querySelector('#menuTypes');
const foodArticlesHeader = document.querySelector(`#foodItemsHeader`)
const foodArticles = document.querySelector('#foodItems');
const cancelOrderButton = document.querySelector('.cancel_order')
const orderButton = document.querySelector('.order')
const myOrder = document.querySelector(`.myOrder`);

function init() {
    addEventListeners();
    loadMenuTypes();
}

function addEventListeners() {
    cancelOrderButton.addEventListener('click', goToStart);
    orderButton.addEventListener('click', goToPayment)
}

function goToStart(){
    window.location.href = "../index.html";
}

function  goToPayment() {
    window.location.href = "./payment_screen.html";
}

function selectType(type) {
    document.querySelectorAll(`#menuTypes li`).forEach(
        li_type => {
            if (li_type === type) {
                li_type.classList.add("selected");
            } else {
                li_type.classList.remove("selected");
            }
        }
    )
}

function loadMenuTypes() {
    let firstItem = true;
    fetch('../assets/data/menu.json')
        .then(response => response.json())
        .then(menuItems => {
            const uniqueTypes = getUniqueTypes(menuItems);

            // Create list items for menu types
            uniqueTypes.forEach(type => {
                const listItem = document.createElement('li');
                listItem.textContent = type;
                listItem.classList.add('type');
                listItem.addEventListener('click', function() {
                    displayMenuItemsByType(type, menuItems);
                });
                menuTypes.appendChild(listItem);
                if (firstItem) {
                    firstItem = false;
                    displayMenuItemsByType(type, menuItems);
                    selectType(listItem);
                }
            });
            document.querySelectorAll(`#menuTypes li`).forEach(type => {
                type.addEventListener('click', function() {
                    selectType(type);
                });
            });
        })
        .catch(error => console.error(error));
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
            menuPrice.textContent = item.cost.toString() + " €";
            menuImage.src = `../assets/media/${item.image}`;

            menuItem.appendChild(menuName);
            menuItem.appendChild(menuImage);
            menuItem.appendChild(menuPrice);

            foodArticles.appendChild(menuItem);

            menuItem.addEventListener('click', function () {
                addFoodToList(menuItem);
            })
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
    console.log(foodItem)
}
