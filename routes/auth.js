const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const SALT = 10;
const UserModel = require("./../models/User");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

router.post("/signup", async (req, res, next) => {
    try {
        // 1 - Récupérer les infos du formulaire
        // const { firstname, lastname, email, password } = req.body;
        // 2 - Vérifier que le user n'est pas en double
        const foundUser = await UserModel.findOne({ email: req.body.email });
        if (foundUser) {
            console.log("Duplicate, this email already exists: ", foundUser.email);
            req.flash("warning", "Email already registered");
            res.redirect("/auth/signup");
        } else {
            // 3 - Hasher le mdp
            const hashedPassword = await bcrypt.hashSync(req.body.password, SALT);
            // 4 - Créer le user dans la db --> UserModel.create(...)
            await UserModel.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
            });
            // 5 - Rediriger vers la page signin
            await res.redirect("/auth/signin");
        }
    } catch (err) {
        next(err);
    }
});

router.post("/signin", async (req, res, next) => {
    try {
        // 1 - Récupérer les infos du formulaire
        const { email, password } = req.body;
        // 2 - voir si l'utilisateur existe
        const foundUser = await UserModel.findOne({ email: email });
        if (!foundUser) {
            // console.log("User not found", foundUser.email);
            req.flash("Error", "Credentials not valid");
            res.redirect("/auth/signin");

        } else {
            //3 - comparer les passwords
            const isSamePassword = bcrypt.compareSync(password, foundUser.password);
            if (!isSamePassword) {
                req.flash("Error", "Invalid password");
                res.redirect("/auth/signin");
            } else {
                const foundUserObject = foundUser.toObject();
                console.log("FOUNDUSEROBJECT :", foundUserObject);
                console.log("***");
                console.log("FOUDUSER : ", foundUser);
                delete foundUserObject.password;

                req.session.currentUser = foundUserObject;

                res.redirect("/")

            }
        }

    } catch (err) {
        next(err);

    }



});

module.exports = router;
