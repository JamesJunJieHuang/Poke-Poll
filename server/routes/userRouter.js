const express = require("express");
const userController = require('../controllers/userController')
const User = require('../models/UserModel')
const session = require('express-session')

const router = express.Router();

router.get("/getCurrFave", userController.getCurrFave, (req, res) => {
  res.status(200).json(res.locals.currFave)
});

router.post("/signup", userController.createUser, (req, res) => {
    res.status(200).json(res.locals.newUser)
});

router.post("/login", userController.loginUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post("/logout", (req, res) => {
  // Perform any necessary cleanup or session termination here
  // For example, if you are using session cookies, you might destroy the session:
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