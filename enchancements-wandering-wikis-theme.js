document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menu functionality
    const menuToggle = document.querySelector('#hamburger-menu');
    const notificationToggle = document.querySelector('.notification-bell');
    const navMenu = document.querySelector('#nav-menu');
    const notificationDropdown = document.querySelector('.notification-dropdown');

    function closeAllDropdowns() {
        menuToggle.classList.remove('open');
        notificationToggle.classList.remove('open');
        navMenu.style.display = 'none';
        notificationDropdown.style.display = 'none';
    }

    function toggleDropdown(toggle, dropdown) {
        closeAllDropdowns();
        toggle.classList.toggle('open');
        dropdown.style.display = toggle.classList.contains('open') ? 'block' : 'none';
    }

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(this, navMenu);
    });

    notificationToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(this, notificationDropdown);
    });

    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) &&
            !notificationToggle.contains(e.target) && !notificationDropdown.contains(e.target)) {
            closeAllDropdowns();
        }
    });

    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });

    // Populate categories
    var categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        const categories = ['Category 1', 'Category 2', 'Category 3'];
        categories.forEach(function(category) {
            const div = document.createElement('div');
            div.textContent = category;
            categoriesContainer.appendChild(div);
        });
    }

    // Limit displayed labels
    var labelWidget = document.querySelector('#Label1 .widget-content');
    if (labelWidget) {
        var labels = labelWidget.querySelectorAll('li');
        for (var i = 9; i < labels.length; i++) {
            labels[i].style.display = 'none';
        }
    }
});
