

document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu__toggle');
    var menuItems = document.querySelectorAll('.menu__item');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            menuToggle.checked = false;
        });
    });
});

const themeToggle = document.getElementById("theme-toggle");
const closeBtn = document.getElementById("close-btn");
const body = document.body;
let holdTimer;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

themeToggle.addEventListener("touchstart", touchStart, false);
themeToggle.addEventListener("touchmove", touchMove, false);
themeToggle.addEventListener("mousedown", mouseDown, false);
themeToggle.addEventListener("mouseup", mouseUp, false);

closeBtn.addEventListener("touchstart", touchStart, false);
closeBtn.addEventListener("touchmove", touchMove, false);
closeBtn.addEventListener("mousedown", mouseDown, false);
closeBtn.addEventListener("mouseup", mouseUp, false);

function touchStart(event) {
    if (window.innerWidth <= 1024) {
        const target = event.target;
        offsetX = event.touches[0].clientX - target.getBoundingClientRect().left;
        offsetY = event.touches[0].clientY - target.getBoundingClientRect().top;
        isDragging = true;

        holdTimer = setTimeout(() => {
            swapButtons(target);
        }, 500);
    }
}

function touchMove(event) {
    if (isDragging) {
        clearTimeout(holdTimer);
        event.preventDefault();

        const target = event.target;
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;

        target.style.left = touchX - offsetX + "px";
        target.style.top = touchY - offsetY + "px";
    }
}

themeToggle.addEventListener("touchend", function () {
    if (isDragging) {
        offsetX = 0;
        offsetY = 0;
        isDragging = false;
        clearTimeout(holdTimer);
    }
});

themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark");
    themeToggle.classList.toggle("fa-sun");
    themeToggle.classList.toggle("fa-moon");
});

function mouseDown(event) {
    const target = event.target;
    offsetX = event.clientX - target.getBoundingClientRect().left;
    offsetY = event.clientY - target.getBoundingClientRect().top;

    holdTimer = setTimeout(() => {
        swapButtons(target);
    }, 500);
}

function mouseUp() {
    clearTimeout(holdTimer);
}

function swapButtons(target) {
    const rect = target.getBoundingClientRect();
    closeBtn.style.left = rect.left + "px";
    closeBtn.style.top = rect.top + "px";
    themeToggle.style.display = "none";
    closeBtn.style.display = "block";
}

closeBtn.addEventListener("click", function () {
    closeBtn.style.display = "none";
    closeBtn.style.visibility = "hidden";
});