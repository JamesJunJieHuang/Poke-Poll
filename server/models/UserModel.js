const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  favoritePokemon: {
    type: Number,
    require: false,
    default: null,
  },
});

// // use it for hashing password before saving to database
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
