const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { post } = require("./category");
const Post = mongoose.model("Post");
const Category = mongoose.model("Category");

router.get("/posts", function (req, res) {
  Post.find()
    .populate("category", "_id name")
    .then(function (posts) {
      res.json({ posts });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/featured-posts", function (req, res) {
  Post.find({ isFeatured: true })
    .populate("category", "_id name")
    .then(function (posts) {
      res.json({ posts });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/trending-posts", function (req, res) {
  Post.find()
    .sort({ numberOfLikes: -1 })
    .then(function (posts) {
      res.json({ posts });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/fresh-stories", function (req, res) {
  Post.find()
    .sort({ _id: -1 })
    .limit(3)
    .then(function (posts) {
      res.json({ posts });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.post("/new-post", function (req, res) {
  const {
    title,
    description,
    imgUrl,
    category,
    numberOfLikes,
    isFeatured,
  } = req.body;

  if (!title || !description || !imgUrl || !category || !isFeatured) {
    res.json({ error: "All fields required!" });
  }

  Category.findOne({ _id: category.id })
    .then(function (cat) {
      const post = new Post({
        title,
        description,
        imgUrl,
        numberOfLikes,
        isFeatured,
        category: cat,
      });

      post
        .save()
        .then(function () {
          res.json({ message: "Post created!" });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/search/:str", function (req, res) {
  const { str } = req.params;

  if (!str) {
    res.send({ error: "Nothing searched!" });
  }

  Post.find({ $text: { $search: str } })
    .then(function (posts) {
      res.json({ posts });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
