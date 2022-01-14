const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:category", async (req, res, next) => {
  try {
    if (req.params.category === "collection") {
      const sneakers = await SneakerModel.find()
      res.render("products", { category: req.params.category, sneakers });
    } else {
      const sneakers = await SneakerModel.find({ category: req.params.category })
      res.render("products", { category: req.params.category, sneakers });
    }
  } catch (error) {
    next(error)
  }
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

module.exports = router;
