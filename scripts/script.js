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
  
      // 點擊標記時顯示 InfoBubble
            marker.addEventListener('tap', (evt) => {
                // 獲取標記的位置
                const position = evt.target.getGeometry();

                // 創建或更新 InfoBubble
                const bubble = new H.ui.InfoBubble(position, {
                    content: generateInfoTable() // 調用生成表格的函數
                });

                // 將 InfoBubble 添加到 UI
                ui.addBubble(bubble);
            });
  
      searchButton.addEventListener('click', () => {
        const lat = parseFloat(document.querySelector('.search-input').value.split(',')[0]);
        const lng = parseFloat(document.querySelector('.search-input').value.split(',')[1]);
        map.setCenter({ lat, lng });
        marker.setGeometry({ lat, lng });
      });
  
      /**
             * 生成表格的函數
             * @returns {string} 表格的 HTML 字符串
             */
            function generateInfoTable() {
                return `
                    <table class="info-table">
                        <tr>
                            <th>Name</th>
                            <td>Pittsburgh</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>City</td>
                        </tr>
                        <tr>
                            <th>Resource</th>
                            <td>Call</td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td>412-255-2621</td>
                        </tr>
                        <tr>
                            <th>Note</th>
                            <td><a href="https://pittsburghpa.gov/omi/filing-complaint/" target="_blank">
                                No complaint form, but very thorough information (on OMI) on it
                            </a></td>
                        </tr>
                    </table>
                `;
            }
});
