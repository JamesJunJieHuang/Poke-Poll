const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  pokemonList: {
    type: Array(Object),
    require: true,
    default: {},
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
