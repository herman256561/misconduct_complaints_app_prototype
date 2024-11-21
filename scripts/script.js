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
  
    // 初始化 Here Maps 平台
      const platform = new H.service.Platform({
          app_id: 'PZFNvWK2yeN0Rgd34HaW',
          apikey: 'bjVmBc2hpWGt1sn_mtnkvZCkuC0vqx_D3pp44ehO5AE' // 替換為您的 Here Maps API Key
      });

      // 獲取默認圖層
      const defaultLayers = platform.createDefaultLayers();

      // 初始化地圖容器
      const map = new H.Map(
          document.getElementById('map'),
          defaultLayers.vector.normal.map,
          {
              center: { lat: 40.444611161087145, lng: -79.9521080838433 }, // 初始經緯度
              zoom: 15, // 初始縮放等級
          }
      );

      // 添加互動功能（縮放、拖拽）
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // 添加 UI 控件（縮放按鈕等）
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      // 添加標記
      const marker = new H.map.Marker({ lat: 40.444611161087145, lng: -79.9521080838433 });
      map.addObject(marker);
  
      searchButton.addEventListener('click', () => {
        const lat = parseFloat(document.querySelector('.search-input').value.split(',')[0]);
        const lng = parseFloat(document.querySelector('.search-input').value.split(',')[1]);
        map.setCenter({ lat, lng });
        marker.setGeometry({ lat, lng });
      });
});
