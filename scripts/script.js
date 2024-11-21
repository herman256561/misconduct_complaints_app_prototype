// page load
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    const tables = document.querySelectorAll('.info-table');

    // click search button
    searchButton.addEventListener('click', () => {
        tables.forEach(table => {
            table.style.display = 'table'; // 顯示所有表格
        });
    });
});

