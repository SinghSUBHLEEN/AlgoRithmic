const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListSchema = new Schema({
  createdBy: {
    type: String,
    ref: "user",
  },
  listTitle: {
    type: String,
    required: true,
  },

  problems: [
    {
      problemId: {
        type: String,
        ref: "problem",
      },
      desc: String,
      difficulty: String,
      tag: String,

      checkedBy: [
        {
          type: String,
          ref: "user",
        },
      ],
    },
  ],
});
module.exports = Cart = mongoose.model("list", ListSchema);
