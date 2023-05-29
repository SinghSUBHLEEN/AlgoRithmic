const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require("cookie-parser");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
connect();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const checkRoutes = require("./routes/createChecks");
const User = require("./models/User");
const Problem = require('./models/Problem');
const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(cookie());
app.use("/api", problemRoutes);
app.use("/api", userRoutes);
app.use("/api", listRoutes);
app.use("/api", checkRoutes);
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/login', (req, res) => {
  const { email, password, rem } = req.body;
  if (!email && !password) {
    return res.status(400).json({ error: "Please enter the email and password" });
  }
  else if (!email) {
    res.status(400).json({ error: "Please enter the email" });
  }
  else if (!password) {
    res.status(400).json({ error: "Please enter the password" });
  }
  else {
    const arr = User.findOne({ email: email }, (err, data) => {
      if (err) {
        res.send(501).json({ error: "Something went wrong" });
      }
      else {
        if (!data) {
          res.status(400).json({ error: "No such user" });
        }
        else {
          bcrypt.compare(password, data.password, (err, val) => {
            if (err) {
              res.status(501).json({ error: "Something went wrong" });
            }
            else {
              const token = jwt.sign({ _id: data._id }, process.env.token_secret_key);
              if (!val)
                res.status(400).json({ error: "Wrong password" });
              else {
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).json({ _id: data._id, message: "Logged in", error: "", token: token });
              }

            }
          });
        }
      }
    });
  }
});

app.post('/api/register', (req, res) => {
  console.log(req.body);
  const { fname, lname, email, password, confirm_password, rem } = req.body;
  if (!email || !password || !fname || !confirm_password) {
    return res.status(400).json({ error: "Please fill all the feilds" });
  }
  if (password !== confirm_password)
    return res.status(400).json({ error: "Password does not match" });
  User.findOne({ email: email }, (err, data) => {
    if (err)
      res.status(501).json({ error: "Something went wrong" });
    else {
      console.log(data);
      if (data) {
        res.status(400).json({ error: "User already exists" });
      }
      else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err)
            res.status(501).json({ error: "Something went wrong" });
          else {
            User.create({ email: email, fname: fname, lname: lname, password: hash }, (err, data) => {
              if (err)
                res.status(501).json({ error: "Cannot create user right now, please try again later" });
              else {
                const token = jwt.sign({ _id: data._id }, process.env.token_secret_key);
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).json({ _id: data._id, message: "Logged in", error: "", token: token });
              }
            });
          }
        })
      }
    }
  })
});

app.post("/api/verify", (req, res) => {
  console.log(req.cookies);
  const cook = req.cookies.token;
  const _id = jwt.verify(token, process.env.token_secret_key)._id;
  User.findOne({ _id: _id, }, (err, data) => {
    if (err)
      res.status(501);
    else {
      if (data)
        res.status(201);
      else
        res.status(400);
    }
  });
})

app.post("/api/getProblemsByTag", (req, res) => {
  const { tag } = req.body;
  Problem.find({ tag: tag }, (err, data) => {
    if (err) res.status(501).json({ error: "Something went wrong" });
    else {
      console.log(data);
      data.flag = false;
      res.status(201).json({ arr: data });
    }
  })
});

app.post('/api/getProblemsByTagAndId', (req, res) => {
  const { tag, token } = req.body;
  let ispresent = new Array();
  const userid = jwt.verify(token, process.env.token_secret_key)._id;
  console.log(req.body);
  const ans = [{
    difficulty: String, _id: String, tag: String, desc: String, link: String, flag: Boolean
  }];
  Problem.find({ tag: tag }, (err, data) => {
    if (err) res.status(501).json({ error: "Something went wrong" });
    else {
      for (let i = 0; i < data.length; i += 1) {
        const obj = { difficulty: data[i].difficulty, _id: data[i]._id, tag: data[i].tag, desc: data[i].desc, link: data[i].link, flag: false };
        if (data[i].checkedBy.get(userid))
          ispresent.push(data[i]._id);
        ans.push(obj);
      }
      res.status(201).json({ error: "", arr: ans, check: ispresent });
    }
  })
});

app.post('/api/handleUpdate', (req, res) => {
  const { problemId, token } = req.body;
  const arr1 = [];
  const arr2 = [];
  const userid = jwt.verify(token, process.env.token_secret_key)._id;
  console.log(userid);
  Problem.findOne({ _id: problemId }, (err, data) => {
    if (err)
      res.status(501).json({ error: "Something went wrong" });
    else {
      const obj = data;
      if (data.checkedBy.get(userid)) {
        let m = data.checkedBy;
        m.delete(userid);
        console.log("removed" + userid);
        obj.checkedBy = m;
      }
      else {
        let m = data.checkedBy;
        m.set(userid, "present");
        console.log("created" + userid);
        obj.checkedBy = m;
      }
      Problem.updateOne({ _id: problemId }, obj, (err, data) => {
        if (err)
          res.status(501).json({ error: "Something went wrong" });
        else {
          res.status(201).json({ message: "Done", error: "", arr });
        }
      })
    }
  })
})

// let m = new Map();
// m.set("check", 1);

// Problem.create({ difficulty: "Hard", desc: "Number of Great Partitions", link: "https://leetcode.com/problems/number-of-great-partitions/", tag: "Dynamic Programming", checkedBy: m }, (err, data) => {
//   if (err) console.log(err);
//   else {
//     console.log(data);
//   }
// });