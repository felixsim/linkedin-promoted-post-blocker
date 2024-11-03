function removePromotedPosts() {
    // Find all text nodes containing exactly "Promoted"
    const promotedElements = Array.from(document.querySelectorAll('span'))
        .filter(element => element.textContent.trim() === 'Promoted');

    promotedElements.forEach(element => {
        // Walk up to find the post container
        const postContainer = element.closest('div[class*="feed-shared-update-v2"]') || 
                            element.closest('article') ||
                            element.closest('div[data-urn]');
        
        if (postContainer) {
            console.log('Removing promoted post');
            postContainer.remove();
        }
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Run the removal function with debouncing
const debouncedRemoval = debounce(removePromotedPosts, 250);

// Initial run
debouncedRemoval();

// Set up mutation observer
const observer = new MutationObserver(debouncedRemoval);

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also run on scroll
document.addEventListener('scroll', debouncedRemoval); 