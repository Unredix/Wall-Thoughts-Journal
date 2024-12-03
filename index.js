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
async function fetchPost(postId) {
  const BASE_URL = "https://wall-thoughts-journal-production.up.railway.app";
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const posts = await response.json();

  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = ""; // Clear the container

  posts.forEach((post) => {
    const postElement = `
      <div id="post-${post.id}" class="wall-post">
        <div class="post-user-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
          />
          <span>${post.author}</span>
          <button class="follow-button">Follow</button>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
        </div>
        <div class="interaction"></div>
          <span>${post.like} likes</span>
          <button class="like-button">Like</button>
          <button class="thumb-button">👍 <span id="thumbs-up-count-${
            post.id
          }">${post.reactions["thumbs-up"]}</span></button>
          <button class="laugh-button">😂 <span id="laugh-count-${post.id}">${
      post.reactions["laugh"]
    }</span></button>
          <button class="heart-button">❤️ <span id="heart-count-${post.id}">${
      post.reactions["heart"]
    }</span></button>
          <button class="angry-button">😡 <span id="angry-count-${post.id}">${
      post.reactions["angry"]
    }</span></button>
        </div>
        <div class="post-time">${new Date(post.date).toLocaleString()}</div>
      </div>`;
    postsContainer.innerHTML += postElement;
  });
}

// Handle form submission for new posts
document
  .getElementById("post-create")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;

    const response = await fetch(`${BASE_URL}/post-create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content }),
    });

    if (response.ok) {
      alert("Post created successfully!");
      fetchPost(1); // Reload posts
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  });

// Send a reaction to the server
async function sendReaction(postId, reactionType) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/reactions/${reactionType}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    fetchPost(1); // Reload posts to update counts
  } else {
    const error = await response.json();
    alert(`Error: ${error.error}`);
  }
}

// Fetch posts on page load
fetchPost(1);

document.getElementById("top-followed-1").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.getElementById("most-popular-button").addEventListener("click", () => {
  document.getElementById("most-popular-button").classList.add("feed-active");
  document.getElementById("latest-button").classList.remove("feed-active");
  document.getElementById("followed-button").classList.remove("feed-active");
});

document.getElementById("latest-button").addEventListener("click", () => {
  document.getElementById("latest-button").classList.add("feed-active");
  document
    .getElementById("most-popular-button")
    .classList.remove("feed-active");
  document.getElementById("followed-button").classList.remove("feed-active");
});
document.getElementById("followed-button").addEventListener("click", () => {
  document.getElementById("followed-button").classList.add("feed-active");
  document
    .getElementById("most-popular-button")
    .classList.remove("feed-active");
  document.getElementById("latest-button").classList.remove("feed-active");
});
