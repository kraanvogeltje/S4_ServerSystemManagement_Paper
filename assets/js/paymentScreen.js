document.addEventListener("DOMContentLoaded", init)

function init() {
    const switchPageDelay = 4000;
    setTimeout(redirectToStart, switchPageDelay);
}

function redirectToStart() {
    window.location.href = "../index.html"
}