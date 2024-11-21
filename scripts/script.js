// page load
document.addEventListener('DOMContentLoaded', () => {
    // 初始化地圖
    const map = L.map('map').setView([40.444611161087145, -79.9521080838433], 15);

    // 加載 OpenStreetMap 圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // 最大縮放等級
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 添加標記
    L.marker([40.444611161087145, -79.9521080838433]).addTo(map)
        .bindPopup('This is your selected location.') // 標記彈出視窗內容
        .openPopup(); 
  
    const searchButton = document.querySelector('.search-button');
    const tables = document.querySelectorAll('.info-table');

    // click search button
    searchButton.addEventListener('click', () => {
        tables.forEach(table => {
            table.style.display = 'table'; // 顯示所有表格
        });
    });
});
