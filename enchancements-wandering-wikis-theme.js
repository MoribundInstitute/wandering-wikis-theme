document.addEventListener('DOMContentLoaded', function() {
    // Existing functionality
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

    // New functionality for fetching recent posts
    var notificationList = document.getElementById('notification-list');

  function fetchRecentPosts() {
    console.log('Fetching recent posts for dropdown...');
    fetch('/feeds/posts/default?alt=json&max-results=5')
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            var posts = data.feed.entry;
            notificationList.innerHTML = ''; // Clear existing content
            if (posts && posts.length > 0) {
                console.log('Found posts:', posts.length);
                posts.forEach(post => {
                    var title = post.title.$t;
                    var url = post.link.find(link => link.rel === "alternate").href;
                    var listItem = document.createElement('div');
                    listItem.className = 'notification-item';
                    listItem.innerHTML = `<a href="${url}">${title}</a>`;
                    notificationList.appendChild(listItem);
                });
                console.log('Added recent posts to dropdown');
            } else {
                console.log('No recent posts found in the data');
                notificationList.innerHTML = '<div class="notification-item">No recent posts found</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching recent posts:', error);
            notificationList.innerHTML = '<div class="notification-item">Error loading recent posts</div>';
        });
}

    // Modified notification toggle event listener
    notificationToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Notification bell clicked');
        if (!this.classList.contains('open')) {
            fetchRecentPosts();
        }
        toggleDropdown(this, notificationDropdown);
        console.log('Dropdown visibility:', notificationDropdown.style.display);
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
