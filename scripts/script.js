// page load
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    const infoTable = document.querySelector('.info-table');

    // click search button
    searchButton.addEventListener('click', () => {
        if (infoTable) {
            infoTable.style.display = 'table'; // show table
        }
    });
});


/*
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = document.querySelector('.search-input').value;
            alert(`Searching for: ${searchTerm}`);
        });
    }
});
*/

