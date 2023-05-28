const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CheckSchema = new Schema({
  createdBy: {
    type: String,
    ref: "user",
  },
  problems: [
    {
      problemId: {
        type: String,
        ref: "problem",
      },
    },
  ],
});
module.exports = Check = mongoose.model("check", CheckSchema);
