// page load
document.addEventListener('DOMContentLoaded', () => {
    //search button actions
    const searchButton = document.querySelector('.search-button');
    const tables = document.querySelectorAll('.info-table');

    // Click search button to display all tables
    searchButton.addEventListener('click', () => {
        tables.forEach(table => {
            table.style.display = 'table';
        });
    });  

    // Update map center and marker location on search
    searchButton.addEventListener('click', () => {
      const lat = parseFloat(document.querySelector('.search-input').value.split(',')[0]);
      const lng = parseFloat(document.querySelector('.search-input').value.split(',')[1]);
      map.setCenter({ lat, lng });
      marker.setGeometry({ lat, lng });
    });
  
    // Initialize Here Maps platform
      const platform = new H.service.Platform({
          apikey: 'bjVmBc2hpWGt1sn_mtnkvZCkuC0vqx_D3pp44ehO5AE' // 替換為您的 Here Maps API Key
      });

    // Retrieve default map layers
      const defaultLayers = platform.createDefaultLayers();

    // Initialize map container
      const map = new H.Map(
          document.getElementById('map'),
          defaultLayers.vector.normal.map,
          {
              center: { lat: 40.444611161087145, lng: -79.9521080838433 }, // Initial latitude and longitude
              zoom: 15, // Initial zoom level
          }
      );

      // Enable map interaction (zoom, drag)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Add UI controls (e.g., zoom buttons)
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      // Add a marker to the map
      const marker = new H.map.Marker({ lat: 40.444611161087145, lng: -79.9521080838433 });
      map.addObject(marker);
  
      // Add a click event to the marker
      marker.addEventListener('tap', () => {
          // Show a short message in an InfoBubble
          const bubble = new H.ui.InfoBubble({ lat: 40.444611161087145, lng: -79.9521080838433 }, {
              content: 'This is Pittsburgh!' // Simple short message
          });
          ui.addBubble(bubble);
      });
  
});
