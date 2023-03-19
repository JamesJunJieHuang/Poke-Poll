const User = require("../models/UserModel");
const Result = require("../models/ResultModel");

const resultsController = {};

resultsController.getResults = async (req, res, next) => {
  const results = await Result.findOne();
  res.locals.results = {
    result: results.pollResults,
    favPokemon_id: req.session.favPokemon_id,
  };
  return next();
};

resultsController.updateResults = async (req, res, next) => {
  const { favPokemon_id } = res.locals;
  //retrieve the current results model from DB
  const currResults = await Result.findOne({});
  //retrieve current users array from DB
  const currUsers = await User.find({});
  //add 1 to specific pokemon id in poll results
  const { pollResults } = currResults;

  for (const property in pollResults) {
     pollResults[property] = 0;
  }

  for (const user of currUsers) {
    pollResults[user.favoritePokemon]++;
  }

  //update the specific results model with new poll results
  const newResults = await Result.findByIdAndUpdate(
    "63f7e7b98329d735e21de9ae",
    {
      pollResults: pollResults,
    },
    { returnDocument: "after" }
  );

  res.locals.newResults = newResults;
  return next();
};

module.exports = resultsController;
