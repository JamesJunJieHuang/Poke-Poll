const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { DB_URI } = process.env;
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouter");
const getPokemonRouter = require("./routes/getPokemonRouter");
const resultsRouter = require("./routes/resultsRouter");
const Result = require("./models/ResultModel");
const Pokemon = require("./models/PokemonModel");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = require("./store");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.set("strictQuery", false);
//mongodb connection & port listener
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to DB ✅");
    app.listen(PORT, console.log(`Listening at http://localhost:${PORT}/ ✅`));
  })
  .catch(console.error);

//session fires with every request to server
app.use(
  session({
    secret: "hello this is secret",
    //new session for every request? set to false
    resave: false,
    //if we havent modified session, do we want it to save? no, set to false
    saveUninitialized: false,
    //connects to mongoDB and stores session
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 60 min
    },
  })
);

// serve the production assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
}

//Routes
app.use("/api/getPokemon", getPokemonRouter);
app.use("/api/user", userRouter);
app.use("/api/results", resultsRouter);


if (process.env.NODE_ENV === "production") {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("Page not found, please check your URL endpoints!")
);

// express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creates an initial result in our database
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const initObj = {}
// for (let i=1; i<=150; i++){
//   initObj[i] = 0;
// }
// Result.create({
//   pollResults: initObj,
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creates an initial array of pokemon and its images in our database
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const initArr = [];
// const initialLoad = async () => {
//   const response = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
//   );
//   const firstGenPokemon = await response.json();
//   pokemonArr = firstGenPokemon.results;

//   for (let pokemonIndex = 1; pokemonIndex <= 151; pokemonIndex++) {
//     pokemonArr[pokemonIndex - 1].id = pokemonIndex;
//     pokemonArr[pokemonIndex - 1].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

//     const response2 = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
//     );
//     const firstGenPokemon = await response2.json();

//     pokemonArr[pokemonIndex - 1].type = firstGenPokemon.types;
//     pokemonArr[pokemonIndex - 1].stats = firstGenPokemon.stats;
//   }
//   const newPokemonList = await Pokemon.create({ pokemonList: pokemonArr });
// };
// initialLoad();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
