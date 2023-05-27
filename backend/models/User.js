const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  list: [
    {
      type: String,
      ref: "problem",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
