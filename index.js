document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  window.addEventListener("resize", () => {
    let width = window.innerWidth;

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

let post_background;

document.getElementById("background1").addEventListener("click", () => {
  document.querySelector(".post-create").style.backgroundImage =
    "url(imgs/brick1.jpg)";
  post_background = "url(imgs/brick1.jpg)";
});

document.getElementById("background2").addEventListener("click", () => {
  document.querySelector(".post-create").style.backgroundImage =
    "url(imgs/brick2.jpg)";
  post_background = "url(imgs/brick2.jpg)";
});

document.getElementById("background3").addEventListener("click", () => {
  document.querySelector(".post-create").style.backgroundImage =
    "url(imgs/brick3.jpg)";
  post_background = "url(imgs/brick3.jpg)";
});
document.getElementById("background4").addEventListener("click", () => {
  document.querySelector(".post-create").style.backgroundImage = "none";
  post_background = "none";
});

function createPost() {
  const input = document.getElementById("post-input").value;
  const post = document.createElement("div");
  if (input === "") {
    alert("Please enter a post");
  } else {
    post.classList.add("wall-post");
    post.innerHTML = `
      <div class="post-user-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
        />
        <span>Profile name</span>
        <button class="follow-button">Follow</button>
      </div>
      <div class="post-content">
        <p>${input}</p>
      </div>
      `;

    post.style.backgroundImage = post_background;

    document.querySelector(".wall-posts").appendChild(post);

    document.getElementById("post-input").value = "";
  }
}

document.getElementById("post-create").addEventListener("click", createPost);

document.getElementById("post-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createPost();
  }
});
