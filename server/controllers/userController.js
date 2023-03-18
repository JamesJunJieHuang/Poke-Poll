const User = require("../models/UserModel");
const Result = require("../models/ResultModel");
const bcrypt = require("bcrypt");
const session = require("express-session");
const userController = {};

//creates or registers a new user
userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) res.status(400).send({ message: "Username already exists" });
  else {
    const newUser = await User.create({
      username,
      password,
      favoritePokemon: 0,
    });
    delete newUser.password;
    newUser.password = undefined;
    res.locals.newUser = newUser;
    return next();
  }
};

//verify user function
userController.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      user.password = undefined;
      res.locals.user = user;
      //creates session and save in database and send cookie with session_id to client
      req.session.isAuth = true;
      req.session.username = username;
      return next();
    } else {
      res.status(401).json({ error: "Invalid login information" });
    }
  } catch (err) {
    next({
      log: "error caught in loginUser middleware!",
      status: 400,
      message: { err: err },
    });
  }
};

//get curr fave pokemon
userController.getCurrFave = async (req, res, next) => {
  const user = await User.findOne({ username: req.session.username });
  if (!user) {
    res.status(401).send({ message: "user can't be found" })
  } else {
    res.locals.currFave = user.favoritePokemon;
  }
  return next();
};

//vote action performed by user
userController.voteByUser = async (req, res, next) => {
  const { favPokemon_id } = req.body;
  const user = await User.findOne({ username: req.session.username });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      favoritePokemon: favPokemon_id,
    },
    { new: true }
  );

  res.locals.favPokemon_id = favPokemon_id;
  return next();
};

//checks if user is authenticated and authorized
userController.isAuth = async (req, res, next) => {
  if (req.session.isAuth) {
    //console.log(req.session);
    return next();
  } else {
    //console.log("unauthorized");
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = userController;
