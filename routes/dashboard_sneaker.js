const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("./../models/Sneaker")
const uploader = require('./../config/cloudinary')

router.get("/", (req, res, next) => {
    SneakerModel.find()
        .then(sneakers => res.render("products_manage", { sneakers }))
.catch((err) => next(err))
});

router.get("/create", (req, res, next) => {
    res.render("products_add")
});

router.get("/edit/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
        .then((sneaker) => {
            res.render("product-edit", { sneaker })
        })
        .catch((err) => next(err))
});

router.get("/delete/:id", (req, res, next) => {
    SneakerModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/dashboard")
                .catch((err) => next(err))
        })
});

router.post("/create", uploader.single("image"), async (req, res, next) => {
    const newSneaker = { ...req.body }
    console.log("THIS IS THE BODY", req.body);
    console.log("THIS IS THE FILE", req.file);
    if (!req.file) newSneaker.image = undefined
    else newSneaker.image = req.file.path
    try {
        await SneakerModel.create(newSneaker)
        req.flash("success", "product successfully created")
        res.redirect("/dashboard")
    } catch (err) {
        next(err)
    }
})

router.post("/edit/:id", async (req, res, next) => {
    try {
        SneakerModel.findByIdAndUpdate(req.params.id, req.body)
        req.flash("success", "product successfully updated")
        res.redirect("/dashboard")
    } catch (err) {
        next(err)
    }
})

module.exports = router;
