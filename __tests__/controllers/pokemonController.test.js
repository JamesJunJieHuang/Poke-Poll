const pokemonController = require("../../server/controllers/pokemonController");

const Pokemon = require("../../server/models/PokemonModel.js");

describe("pokemonController", () => {
  describe("getPokemon", () => {
    it("should get the pokemon object that contains pokemonList: array", async () => {
      const mockResults = { _id: "63fc48e80e07c677ed95b8dd", pokemonList: [] };

      Pokemon.findOne = jest.fn().mockResolvedValue(mockResults);

      const req = {};
      //instantiate res.locals as an object
      const res = { locals: {} };
      //set next as jest fn as it will be called
      const next = jest.fn();

      //test invocation of controller function
      await pokemonController.getPokemon(req,res,next);

      expect(Pokemon.findOne).toHaveBeenCalledTimes(1);
      expect(res.locals.pokemonArr).toEqual(mockResults);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
