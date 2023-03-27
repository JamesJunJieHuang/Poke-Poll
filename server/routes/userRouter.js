const express = require("express");
const userController = require('../controllers/userController')
const User = require('../models/UserModel')
const session = require('express-session')

const router = express.Router();

router.post("/signup", userController.createUser, (req, res) => {
    res.status(200).json(res.locals.newUser)
});

router.post("/login", userController.loginUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post("/logout", (req, res) => {
  // log out and terminate session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging out");
    } else {
      res.clearCookie("connect.sid"); // clear the cookie
      res.status(200).send("Logged out successfully");
    }
  });
});


module.exports = router;