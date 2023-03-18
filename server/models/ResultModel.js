const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const resultSchema = new Schema({
  pollResults: {
    type: Object,
    require: true,
    default: {},
  },
});


const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
