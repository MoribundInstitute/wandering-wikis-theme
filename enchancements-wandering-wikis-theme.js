// enhancements.js

// Function to populate categories
document.addEventListener('DOMContentLoaded', function() {
    var categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        const categories = ['Category 1', 'Category 2', 'Category 3'];
        categories.forEach(function(category) {
            const div = document.createElement('div');
            div.textContent = category; // Create a text element for each category
            categoriesContainer.appendChild(div);
        });
    }
});

// Function to limit displayed labels
document.addEventListener('DOMContentLoaded', function() {
    var labelWidget = document.querySelector('#Label1 .widget-content'); // Adjusted selector
    if (labelWidget) {
        var labels = labelWidget.querySelectorAll('li'); // Ensure labels are in <li>
        for (var i = 9; i < labels.length; i++) {
            labels[i].style.display = 'none';
        }
    }
});
