const List = require("../models/List");
const Problem = require("../models/Problem");
const User = require("../models/User");
const { findByIdAndDelete } = require("../models/User");
module.exports.createList = async (req, res) => {
  const id = req.body.userId;
  const t = req.body.title;
  console.log(id);
  console.log(t);
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
  const id = req.params.listId;
  const pId = req.params.problemId;
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
  const id = req.params.listId;
  const p = await List.findByIdAndDelete({ _id: id });
  if (p) {
    res.status(201).send("has been deleted");
  }
};

module.exports.deleteProblemFromList = async (req, res) => {
  const id = req.params.listId;
  const pp = req.params.problemId;
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

module.exports.getList = async (req, res) => {
  const id = req.params.id;
  let x = await List.find({ createdBy: id });

  if (x) {
    res.status(201).json(x);
  } else {
    res.status(201).send("no list found");
  }
};

module.exports.getSolved = async (req, res) => {
  const id = req.params.id;
  let x = await User.findOne({ _id: id });
  if (x) {
    res.status(201).json(x.list);
  }
};

module.exports.getListForHomePage = async (req, res) => {
  try {
    const y = req.params.id;
    let x = await List.find({ createdBy: y }); //listCollection
    const arr = await User.findOne({ _id: y }); //solved array
    console.log(y);
    if (arr) {
      if (x) {
        res.status(201).send(
          {
            listArray: x,
            solvedArray: arr.list,
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
