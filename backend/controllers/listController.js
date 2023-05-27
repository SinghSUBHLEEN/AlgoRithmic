const List = require("../models/List");
const Problem = require("../models/Problem");
const { findByIdAndDelete } = require("../models/User");
module.exports.createList = async (req, res) => {
  const id = req.body.userId;
  const t = req.body.title;
  const x = await List.create({ createdBy: id, listTitle: t });
  if (x) {
    res.status(201).json({
      _id: x._id,
      createdBy: x.createdBy,
      listTitle: x.listTitle,
    });
  } else {
    res.status(201).json("could not create this list");
  }
};
module.exports.addToList = async (req, res) => {
  const id = req.body.listId;
  const pId = req.body.problemId;
  let x = await List.findOne({ _id: id });
  if (x) {
    // res.status(201).json(x);

    const y = await Problem.findOne({ _id: pId });
    if (y) {
      //res.status(201).json(y);
      let idx = x.problems.findIndex((p) => p.problemId === pId);
      if (idx === -1) {
        x.problems.push({
          problemId: y._id,
          desc: y.desc,
          difficulty: y.difficulty,
          tag: y.tag,
          checkedBy: y.checkedBy,
        });
        x = await x.save();
        res.status(201).json("problem added to this list");
      } else {
        res.status(201).json("problem already in the list");
      }
    }
  } else {
    res.status(201).json("could not find the list");
  }
};

module.exports.deleteList = async (req, res) => {
  const id = req.body.listId;
  const p = await List.findByIdAndDelete({ _id: id });
};

module.exports.deleteProblemFromList = async (req, res) => {
  const id = req.body.listId;
  const pp = req.body.problemId;
  let x = await List.findOne({ _id: id });
  if (x) {
    let idx = x.problems.findIndex((p) => p.problemId === pp);
    if (idx !== -1) {
      x.problems.splice(idx, 1);
      x = await x.save();
      res.status(201).json("problem has been delted from the list");
    }
  }
};