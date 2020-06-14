const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

router.get("/comments", function (req, res) {
  Comment.find()
    .populate("post", "_id title")
    .then(function (comments) {
      res.send({ comments });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/comments/post/:postId", function (req, res) {
  Comment.find({ post: { _id: req.params.postId } })
    .populate("post", "_id title")
    .then(function (comments) {
      res.send({ comments });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/comment-num", function (req, res) {
  Comment.count()
    .then(function (comments) {
      res.send({ comments });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post("/new-comment", function (req, res) {
  const { body, post } = req.body;

  if (!body || !post) {
    res.send({ error: "All fields required!" });
  }

  Post.findOne({ _id: post.id })
    .then(function (dbPost) {
      const comment = new Comment({
        body,
        post: dbPost,
      });

      comment
        .save()
        .then(function () {
          res.send({ message: "Comment created!" });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
