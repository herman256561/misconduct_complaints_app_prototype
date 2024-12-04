document.addEventListener("DOMContentLoaded", () => {
  const hidetds = document.querySelector("hide-td");
  
  hidetds.addEventListener("click", () => {
    hidetds.forEach((hidetd) => {
      hidetd.style.display = "none";
    });
    
  });
});
