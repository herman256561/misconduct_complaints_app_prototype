document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  const tables = document.querySelectorAll(".info-table");
  let bubble = null;
  let flag = false;
  let marker = null; // 用於存儲當前的地圖標記

  // 顯示表格
  searchButton.addEventListener("click", () => {
    tables.forEach((table) => {
      table.style.display = "table";
    });
  });

  // Reverse geocoding to get location information
  function reverseGeocode(platform, coord, callback) {
    const geocoder = platform.getSearchService();
    geocoder.reverseGeocode(
      {
        at: `${coord.lat},${coord.lng}`,
      },
      (result) => {
        const location =
          result.items && result.items.length
            ? "ZIP Code: " +
              result.items[0].address.postalCode +
              " Please contact: 412-255-2621"
            : "Unknown location";
        callback(location);
      },
      (error) => {
        console.error("Reverse geocoding failed:", error);
        callback("Error retrieving location");
      }
    );
  }

  // Geocode address from user input
  function geocodeAddress(platform, query, callback) {
    const geocoder = platform.getSearchService();
    geocoder.geocode(
      {
        q: query,
      },
      (result) => {
        if (result.items && result.items.length > 0) {
          const location = result.items[0].position;
          callback(null, location);
        } else {
          callback("Location not found", null);
        }
      },
      (error) => {
        console.error("Geocoding failed:", error);
        callback("Error retrieving location", null);
      }
    );
  }

  // Handle map click events to show location info
  function setUpClickListener(map) {
    map.addEventListener("tap", function (evt) {
      const coord = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );

      reverseGeocode(platform, coord, (location) => {
        if (flag === false) {
          bubble = new H.ui.InfoBubble({ lat: coord.lat, lng: coord.lng });
          bubble.setContent(`Location: ${location}`);
          ui.addBubble(bubble);
          flag = true;
        } else {
          ui.removeBubble(bubble);
          bubble = new H.ui.InfoBubble({ lat: coord.lat, lng: coord.lng });
          bubble.setContent(`${location}`);
          ui.addBubble(bubble);
        }
      });
    });
  }

  // Initialize Here Maps platform
  const platform = new H.service.Platform({
    apikey: "bjVmBc2hpWGt1sn_mtnkvZCkuC0vqx_D3pp44ehO5AE", // Replace with your Here Maps API Key
  });

  // Retrieve default map layers
  const defaultLayers = platform.createDefaultLayers();

  // Initialize map container
  const map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map,
    {
      center: { lat: 40.444611161087145, lng: -79.9521080838433 }, // Initial latitude and longitude
      zoom: 15, // Initial zoom level
    }
  );

  window.addEventListener("resize", () => map.getViewPort().resize());

  // Enable map interaction (zoom, drag)
  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Add UI controls (e.g., zoom buttons)
  const ui = H.ui.UI.createDefault(map, defaultLayers);

  // 處理地址搜尋
  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      geocodeAddress(platform, query, (error, location) => {
        if (error) {
          alert(error);
        } else {
          // 移除前一個標記（如果存在）
          if (marker) {
            map.removeObject(marker);
          }

          // 新位置移動到地圖中心
          map.setCenter(location);

          // 添加新的標記
          marker = new H.map.Marker(location);
          map.addObject(marker);
        }
      });
    } else {
      alert("Please enter a valid address.");
    }
  }

  // Set up map click listener
  setUpClickListener(map);

  // Handle search button click
  searchButton.addEventListener("click", handleSearch);

  // Handle Enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});
