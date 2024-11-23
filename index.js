document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    console.log("Width: " + width);

    if (width < 800) {
      document.getElementById("profile-name").style.display = "none";
    }
    if (width > 800) {
      document.getElementById("profile-name").style.display = "block";
    }

    if (width < 600) {
      document.getElementById("search-input").style.display = "none";
    } else {
      document.getElementById("search-input").style.display = "block";
    }
  });
});
