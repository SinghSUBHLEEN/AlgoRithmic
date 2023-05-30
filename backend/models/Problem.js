const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProblemSchema = new Schema({
  difficulty: {
    type: String,
  },
  desc: {
    type: String,
  },
  link: {
    type: String,
  },
  tag: {
    type: String,
  },
  checkedBy: {
    type: Map,
    of: String
  }
});
module.exports = Cart = mongoose.model("problem", ProblemSchema);