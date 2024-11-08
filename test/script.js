document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to filter projects
    function filterProjects(filter) {
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block'; // Show matching projects
            } else {
                card.style.display = 'none'; // Hide non-matching projects
            }
        });
    }

    // Set up click events for each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons, then add it to the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Call the filter function based on the button's data-filter attribute
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    // Initialize by showing all projects
    filterProjects('all');
});