const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:category", (req, res) => {
  res.render(`category/${req.params.category}`);
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

module.exports = router;
