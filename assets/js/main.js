document.addEventListener('DOMContentLoaded', init);

function init() {
    const menuTypes = document.querySelector('#menuTypes');
    const foodArticles = document.querySelector('#foodItems')
    // addEventListener()
    loadMenuTypes(menuTypes, foodItems)
}


function loadMenuTypes(menuTypes, foodArticles) {
    fetch('../assets/data/menu.json')
        .then(response => response.json())
        .then(menuItems => {
            const uniqueTypes = getUniqueTypes(menuItems);

            // Create list items for menu types
            uniqueTypes.forEach(type => {
                const listItem = document.createElement('li');
                listItem.textContent = type;
                listItem.addEventListener('click', function() {
                    displayMenuItemsByType(type, menuItems, foodArticles);
                });
                menuTypes.appendChild(listItem);
            });
        })
        .catch(error => console.log(error));
}

function displayMenuItemsByType(type, menuItems, foodArticles) {
    foodArticles.innerHTML = `<h2>${type}</h2>`;
    const filteredItems = menuItems;

    filteredItems.forEach(item => {
        if (item.type === type) {
            const menuItem = document.createElement('article');
            const menuName = document.createElement('h4')
            const menuPrice = document.createElement('p')
            // const menuImage = document.createElement("img")

            menuName.textContent = item.name
            menuPrice.textContent = item.cost
            menuItem.appendChild(menuName)
            menuItem.appendChild(menuPrice)
            // menuItem.appendChild(menuImage)
            menuItem.addEventListener('click', function (f) {
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
    console.log(foodItem)
}







