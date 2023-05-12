document.addEventListener('DOMContentLoaded', init);

function init() {
    const menuTypes = document.querySelector('#menuTypes');
    const foodItems = document.querySelector('#foodItems')
    // addEventListener()
    loadMenuTypes(menuTypes)
}


function loadMenuTypes(menuTypes) {
    fetch('../assets/data/menu.json')
        .then(response => response.json())
        .then(data => {
            const menuItems = data;
            const uniqueTypes = getUniqueTypes(menuItems);

            // Create list items for menu types
            uniqueTypes.forEach(type => {
                const listItem = document.createElement('li');
                listItem.textContent = type;
                listItem.addEventListener('click', function() {
                    displayMenuItemsByType(type);
                });
                menuTypes.appendChild(listItem);
            });
        })
        .catch(error => console.log(error));
}

function displayMenuItemsByType(type) {
    console.log(type)
}


function getUniqueTypes(menuItems) {
    const typesSet = new Set();
    menuItems.forEach(item => {
        typesSet.add(item.type);
    });
    return Array.from(typesSet);
}








