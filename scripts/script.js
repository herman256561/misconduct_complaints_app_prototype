document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = document.querySelector('.search-input').value;
            alert(`Searching for: ${searchTerm}`);
        });
    }
});
