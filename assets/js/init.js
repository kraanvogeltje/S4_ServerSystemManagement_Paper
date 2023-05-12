'use strict'

document.addEventListener('DOMContentLoaded', init)

function init() {
    document.querySelector('body').addEventListener("click", goToMain)
}

function goToMain() {
    window.location.href = "pages/main_screen.html";
}





