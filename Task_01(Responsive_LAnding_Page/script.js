// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    
    // Get the container for all navigation links
    const navLinksContainer = document.getElementById('nav-links');
    
    // Get all the individual content sections
    const pageContents = document.querySelectorAll('.page-content');
    
    // Get all clickable navigation items, including those in the dropdown
    const navLinks = navLinksContainer.querySelectorAll('.nav-link, .dropdown-content a');

    // Add a single click event listener to the navigation container
    navLinksContainer.addEventListener('click', function (e) {
        
        // Find the closest ancestor of the clicked element that has a 'data-target' attribute
        const targetLink = e.target.closest('[data-target]');
        
        // If the click was not on a link with a 'data-target', do nothing
        if (!targetLink) return;

        // Prevent the default link behavior (like navigating to a new page)
        e.preventDefault(); 

        // Get the ID of the content section to show from the 'data-target' attribute
        const targetId = targetLink.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        // --- Update Active States ---

        // 1. Remove 'active' class from all navigation links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // 2. Remove 'active' class from all content sections to hide them
        pageContents.forEach(content => content.classList.remove('active'));

        // --- Apply New Active States ---

        // 3. Add 'active' class to the link that was just clicked
        targetLink.classList.add('active');
        
        // If the clicked link is inside a dropdown, also highlight the main "Services" link
        if(targetLink.closest('.dropdown')) {
            targetLink.closest('.dropdown').querySelector('.nav-link').classList.add('active');
        }
        
        // 4. If a matching content section was found, add 'active' class to show it
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});
