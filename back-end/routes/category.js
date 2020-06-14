const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = mongoose.model("Category");

router.get("/categories", function (req, res) {
  Category.find()
    .then(function (categories) {
      res.json({ categories });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get("/category-num", function (req, res) {
  Category.count()
    .then(function (categories) {
      res.json({ categories });
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.post("/new-category", function (req, res) {
  const { name } = req.body;

  if (!name) {
    res.json({ error: "All fields required!" });
  }

  const category = new Category({
    name,
  });

  category
    .save()
    .then(function () {
      res.json({ message: "Category created!" });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
