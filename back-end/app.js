const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const app = express();
const PORT = 5000;

// Connection to MongoDB
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("error", function (error) {
  console.log("Error: " + error);
});

// Models import
require("./models/post");
require("./models/category");
require("./models/comment");

app.use(express.json());

// Routes import
app.use(require("./routes/post"));
app.use(require("./routes/category"));
app.use(require("./routes/comment"));

app.listen(PORT, function () {
  console.log("Server here " + PORT);
});
