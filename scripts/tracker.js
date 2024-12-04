document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".searchArea-button");
  const clearButton = document.querySelector(".clearArea-button");
  const searchInput = document.querySelector(".searchArea-input");
  const rows = document.querySelectorAll(".hide-data");

  // Function to handle the search action
  function handleSearch() {
    // Hide all .hide-data rows regardless of input
    rows.forEach(row => {
      row.style.display = "none";
    });
  }

  // Function to clear the input and show all rows
  function handleClear() {
    searchInput.value = ""; // Clear the search input
    rows.forEach(row => {
      row.style.display = "table-row"; // Show all rows
    });
  }

  // Attach event listeners
  searchButton.addEventListener("click", handleSearch);
  clearButton.addEventListener("click", handleClear);

  // Optionally, trigger search on pressing Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});
