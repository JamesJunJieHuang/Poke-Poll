const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const { DB_URI } = process.env;

const store = new MongoDBStore({
  uri: DB_URI,
  collection: "sessions",
});

module.exports = store;
