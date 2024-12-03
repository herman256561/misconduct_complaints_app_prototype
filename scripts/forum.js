document.addEventListener("DOMContentLoaded", () => {
  // Select search button, clear button, input field, and all discussion elements
  const searchPostButton = document.querySelector(".searchPost-button");
  const clearPostButton = document.querySelector(".clearPost-button"); // Clear button from HTML
  const searchPostInput = document.querySelector(".searchPost-input");
  const discussions = document.querySelectorAll(".discussion");

  // Ensure all required elements are present before proceeding
  if (searchPostButton && searchPostInput && discussions && clearPostButton) {
    // Function to filter discussions based on search query
    function filterDiscussions() {
      const query = searchPostInput.value.trim().toLowerCase();

      // If the input is empty, show all discussions
      if (query === "") {
        discussions.forEach((discussion) => {
          discussion.style.display = "block";
        });
        return;
      }

      // Iterate through all discussions and show/hide based on title match
      discussions.forEach((discussion) => {
        const title = discussion.querySelector("h2").textContent.toLowerCase();

        if (title.includes(query)) {
          discussion.style.display = "block"; // Show matching discussions
        } else {
          discussion.style.display = "none"; // Hide non-matching discussions
        }
      });
    }

    // Function to clear the input field and show all discussions
    function clearInput() {
      searchPostInput.value = ""; // Clear the input field
      discussions.forEach((discussion) => {
        discussion.style.display = "block"; // Show all discussions
      });
    }

    // Attach click event listener to the search button
    searchPostButton.addEventListener("click", filterDiscussions);

    // Attach keypress event listener to handle Enter key for search input
    searchPostInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        filterDiscussions();
      }
    });

    // Attach click event listener to the clear button
    clearPostButton.addEventListener("click", clearInput);
  } else {
    console.error(
      "Search button, input field, discussion elements, or clear button are not found in the DOM."
    );
  }
});
