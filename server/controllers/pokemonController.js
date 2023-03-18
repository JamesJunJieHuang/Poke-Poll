const Pokemon = require("../models/PokemonModel");

const pokemonController = {};

pokemonController.getPokemon = async (req, res, next) => {
  const pokemonArr = await Pokemon.findOne({ _id: "63fc48e80e07c677ed95b8dd" });
  res.locals.pokemonArr = pokemonArr;
  return next();
};

module.exports = pokemonController;
