const express = require("express");
const router = new express.Router();

router.get("/:category", (req, res) => {
    res.render(`category/${req.params.category}`)
});

module.exports = router;