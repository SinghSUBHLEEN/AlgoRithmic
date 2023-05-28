const User = require("../models/User");
const Problem = require("../models/Problem");
module.exports.checker = async (req, res) => {
  const userId = req.body.userId;
  const problemId = req.body.problemId;
  console.log(typeof problemId);
  // return res.status(201).send(typeof problemId);
  try {
    console.log(userId);
    let x = await User.findOne({ _id: userId });
    if (x) {
      let idx = x.list.findIndex((p) => p == problemId);
      if (idx == -1) {
        x.list.push(problemId);
      } else {
        x.list.pull(problemId);
      }
      x = await x.save();
      return res.status(201).send(x);
    } else {
      console.log("suer NOT FOUND");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.findIfSolved = async (req, res) => {
  const userId = req.body.userId;
  const problemId = req.body.problemId;
  console.log(typeof problemId);
  // return res.status(201).send(typeof problemId);
  try {
    console.log(userId);
    let x = await User.findOne({ _id: userId });
    if (x) {
      let idx = x.list.findIndex((p) => p == problemId);
      if (idx == -1) {
        res.json({
          value: 0,
        });
      } else {
        res.json({
          value: 1,
        });
      }
    } else {
      console.log("suer NOT FOUND");
    }
  } catch (error) {
    console.log(error);
  }
};
