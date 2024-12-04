document.addEventListener("DOMContentLoaded", () => {
  const searchAreabutton = document.querySelector("searchArea-button");
  const hidetrs = document.querySelector("hide-data");
  
  searchAreabutton.addEventListener("click", () => {
    hidetrs.forEach((hidetr) => {
      hidetr.style.display = "none";
    }); 
  });
});
