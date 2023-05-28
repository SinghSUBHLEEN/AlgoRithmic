const Check = require("../models/Check");
const Problem = require("../models/Problem");
module.exports.createCheck = async (req, res) => {
  const id = req.body.userId;
  const x = await Check.create({ createdBy: id });
  if (x) {
    res.status(201).json(x);
  } else {
    res.status(500).json("could not create");
  }
};
module.exports.getCheck = async (req, res) => {
  const id = req.body.userId;
  const x = await Check.find({ createdBy: id });
  if (x) {
    res.status(201).json(x);
  } else {
    res.status(500).json("could not create");
  }
};
