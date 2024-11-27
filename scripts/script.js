
// page load
document.addEventListener("DOMContentLoaded", () => {
  //search button actions
  const searchButton = document.querySelector(".search-button");
  const tables = document.querySelectorAll(".info-table");
  let bubble = null;
  let flag = false;

  // Click search button to display all tables
  searchButton.addEventListener("click", () => {
    tables.forEach((table) => {
      table.style.display = "table";
    });
  });

  // Update map center and marker location on search
  // searchButton.addEventListener("click", () => {
  //   const lat = parseFloat(
  //     document.querySelector(".search-input").value.split(",")[0]
  //   );
  //   const lng = parseFloat(
  //     document.querySelector(".search-input").value.split(",")[1]
  //   );
  //   map.setCenter({ lat, lng });
  //   marker.setGeometry({ lat, lng });
  // });

  // Reverse geocoding to get location information
  function reverseGeocode(platform, coord, callback) {
    const geocoder = platform.getSearchService();
    geocoder.reverseGeocode(
      {
        at: `${coord.lat},${coord.lng}`,
      },
      (result) => {
        console.log(result);
        // Extract the first address from the response
        const location =
          result.items && result.items.length
            ? "ZIP Code: "+result.items[0].address.postalCode+" Please contact: 412-255-2621"
            : "Unknown location";
        callback(location);
      },
      (error) => {
        console.error("Reverse geocoding failed:", error);
        callback("Error retrieving location");
      }
    );
  }

  // set up click listener in the map
  function setUpClickListener(map) {
    map.addEventListener("tap", function (evt) {
      var coord = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );

      // Perform reverse geocoding
      reverseGeocode(platform, coord, (location) => {
        // If bubble exists, remove the old one, create a new one
        if (flag == false) {
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

  // call the map click listener function
  setUpClickListener(map);

  // Add UI controls (e.g., zoom buttons)
  const ui = H.ui.UI.createDefault(map, defaultLayers);
});
