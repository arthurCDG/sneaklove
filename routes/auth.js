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
    const findUser = await UserModel.findOne({ email: req.body.email });
    if (findUser) {
      console.log("Duplicate, this email already exists: ", findUser.email);
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

router.post("/signin", (req, res) => {
  res.render("auth/signin");
});

module.exports = router;
