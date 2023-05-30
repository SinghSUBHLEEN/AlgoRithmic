const Problem = require("../models/Problem");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
module.exports.addProblem = async (req, res) => {
  const { difficulty, desc, link, tag } = req.body;
  const x = await Problem.create({ difficulty, desc, link, tag });
  if (x) {
    res.status(201).json({
      _id: x._id,
      difficulty: x.difficulty,
      desc: x.desc,
      link: x.link,
      tag: x.tag,
    });
  } else {
    res.status(400);
    throw new Error("could not add this particular problem");
  }
};
module.exports.findAllProblems = async (req, res) => {

  try {
    const y = jwt.verify(req.params.token, process.env.token_secret_key)._id;
    let x = await Problem.find();
    const arr = await User.findOne({ _id: y });
    console.log(y);
    if (arr) {
      if (x) {
        res.status(201).send(
          {
            problemsArray: x,
            userList: arr.list,
          }

          //list: arr.list,
        );
      }
    } else res.status(201).send(null);
  } catch (error) {
    console.log(error);
    res.status(500).send("something is wrong");
  }
};
module.exports.checker = async (req, res) => {
  // return res.status(201).send(typeof problemId);
  try {
    const userId = jwt.verify(req.params.token, process.env.token_secret_key)._id;
    const problemId = req.params.pid;
    console.log(typeof problemId);
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
