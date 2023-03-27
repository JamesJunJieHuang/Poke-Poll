const express = require("express");
const resultsController = require("../controllers/resultsController");
const userController = require("../controllers/userController");
const pokemonController = require("../controllers/pokemonController");

const router = express.Router();

router.post(
  "/",
  userController.voteByUser,
  resultsController.updateResults,
  (req, res) => {
    res.status(200).json(res.locals.newResults);
  }
);

//before getting pokemon data and user data, we need to check if user is authenticated and authorized to be on this page
router.get("/", userController.isAuth, pokemonController.getPokemon, (req, res) => {
  res.status(200).json({
    pokemonArr: res.locals.pokemonArr,
    favPokemon_id: res.locals.favPokemon_id
  });
});



module.exports = router;
