document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.career-filter-btn');
    const positionCards = document.querySelectorAll('.career-position-card');
    
    // Show all positions by default
    showAllPositions();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const location = this.textContent.trim();
            
            if (location === 'Tất cả') {
                showAllPositions();
            } else {
                filterPositionsByLocation(location);
            }
        });
    });
    
    function showAllPositions() {
        positionCards.forEach(card => {
            card.classList.add('visible');
        });
    }
    
    function filterPositionsByLocation(location) {
        positionCards.forEach(card => {
            const cardLocation = card.querySelector('.career-position-meta span:first-child').textContent.trim();
            if (cardLocation === location) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }
});