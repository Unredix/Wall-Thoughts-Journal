const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://unredix.github.io/Wall-Thoughts-Journal/",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Path to your JSON file
const jsonFilePath = `${__dirname}/database.json`;

// Load JSON file
function loadJSONFile() {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading JSON file:", error.message);
    return { posts: [] }; // Default structure
  }
}

// Save JSON file
function saveJSONFile(data) {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving JSON file:", error.message);
  }
}

// Endpoint to handle creating a new post
app.post("/posts", (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required." });
  }

  // Load the current database
  const database = loadJSONFile();

  // Create a new post
  const newPost = {
    id: database.posts.length, // Use length as the new post's ID
    author,
    date: new Date().toISOString(),
    like: "0",
    reactions: {
      "thumbs-up": 0,
      laugh: 0,
      heart: 0,
      angry: 0,
    },
    content,
  };

  // Append the new post to the posts array
  database.posts.push(newPost);

  // Save the updated database back to the JSON file
  saveJSONFile(database);

  // Respond with the new post
  res.status(201).json(newPost);
});

// Endpoint to get a post by ID
app.get("/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const database = loadJSONFile();
  const post = database.posts.find((p) => p.id === postId);

  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// Endpoint to increment a like or a specific reaction
app.post("/posts/:postId/reactions/:reactionType", (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const reactionType = req.params.reactionType;
  const database = loadJSONFile();
  const post = database.posts.find((p) => p.id === postId);

  if (!post) return res.status(404).json({ error: "Post not found" });

  if (reactionType === "like") {
    post.like = (parseInt(post.like, 10) + 1).toString();
  } else if (post.reactions[reactionType] !== undefined) {
    post.reactions[reactionType]++;
  } else {
    return res.status(400).json({ error: "Invalid reaction type" });
  }

  // Save the updated database
  saveJSONFile(database);
  res.json(post);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on port 3000"));
