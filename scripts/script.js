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

const map = L.map('map').setView([40.4433, -79.9436], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);