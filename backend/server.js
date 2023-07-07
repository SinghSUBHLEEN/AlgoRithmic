const express = require("express");
const app = express();
const path = require('path');
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
app.use(express.static(__dirname + '/frontend/build'));
app.use(express.json());
app.use(cookie());
app.use("/api", problemRoutes);
app.use("/api", userRoutes);
app.use("/api", listRoutes);
app.use("/api", checkRoutes);
app.listen(5000 || process.env.PORT, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// })

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
              const token = jwt.sign({ _id: data._id, fname: data.fname, lname: data.lname }, process.env.token_secret_key);
              const fname = data.fname, lname = data.lname;
              if (!val)
                res.status(400).json({ error: "Wrong password" });
              else {
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).cookie("fname", fname, options).cookie("lname", lname, options).json({ _id: data._id, message: "Logged in", error: "", token: token, fname: data.fname, lname: data.lname });
              }

            }
          });
        }
      }
    });
  }
});

app.post('/api/getinfo', (req, res) => {
  const obj = new Object();
  const o = jwt.verify(req.body.token, process.env.token_secret_key);
  obj.fname = o.fname;
  obj.lname = o.lname;
  res.json({ user_info: obj });
})

app.post('/api/register', (req, res) => {
  console.log(req.body);
  const { fname, lname, email, password, confirm_password, rem } = req.body;
  if (!email || !password || !fname || !confirm_password) {
    return res.status(400).json({ error: "Please fill all the feilds correctly" });
  }
  if (password !== confirm_password)
    return res.status(400).json({ error: "Password did not match" });
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
            res.status(501).json({ error: "Oops! Something went wrong" });
          else {
            User.create({ email: email, fname: fname, lname: lname, password: hash }, (err, data) => {
              if (err)
                res.status(501).json({ error: "Cannot create user right now, please try again later" });
              else {
                const token = jwt.sign({ _id: data._id, fname: data.fname, lname: data.lname }, process.env.token_secret_key);
                const fname = data.fname, lname = data.lname;
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).cookie("fname", fname, options).cookie("lname", lname, options).json({ _id: data._id, message: "Logged in", error: "", token: token, fname: data.fname, lname: data.lname });
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
  const _id = jwt.verify(req.body.token, process.env.token_secret_key)._id;
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
  console.log(tag);
  const ans = [{
    difficulty: String, _id: String, tag: String, desc: String, link: String, flag: Boolean
  }];
  const totalvalues = { easy: Number, medium: Number, hard: Number };
  totalvalues.easy = 0;
  totalvalues.medium = 0;
  totalvalues.hard = 0;
  Problem.find({ tag: tag }, (err, data) => {
    if (err) res.status(501).json({ error: "Something went wrong" });
    else {
      for (let i = 0; i < data.length; i += 1) {
        const obj = { difficulty: data[i].difficulty, _id: data[i]._id, tag: data[i].tag, desc: data[i].desc, link: data[i].link, flag: false };
        if (data[i].difficulty === "Hard" || data[i].difficulty === "hard")
          totalvalues.hard = totalvalues.hard + 1;
        else if (data[i].difficulty === "Medium" || data[i].difficulty === "Medium")
          totalvalues.medium = totalvalues.medium + 1;
        else if (data[i].difficulty === "Easy" || data[i].difficulty === "easy")
          totalvalues.easy = totalvalues.easy + 1;
        ans.push(obj);
      }

    }
    res.status(201).json({ error: "", arr: ans, total: totalvalues });
  });
});

app.post('/api/getProblemsByTagAndId', (req, res) => {
  const { tag, token } = req.body;
  const values = { easy: Number, medium: Number, hard: Number };
  const totalvalues = { easy: Number, medium: Number, hard: Number };
  values.easy = totalvalues.easy = 0;
  values.medium = totalvalues.medium = 0;
  values.hard = totalvalues.hard = 0;
  let ispresent = new Array();
  const userid = jwt.verify(token, process.env.token_secret_key)._id;
  console.log(req.body.tag);
  const ans = [{
    difficulty: String, _id: String, tag: String, desc: String, link: String, flag: Boolean
  }];
  Problem.find({ tag: tag }, (err, data) => {
    if (err) res.status(501).json({ error: "Something went wrong" });
    else {
      for (let i = 0; i < data.length; i += 1) {
        const obj = { difficulty: data[i].difficulty, _id: data[i]._id, tag: data[i].tag, desc: data[i].desc, link: data[i].link, flag: false };
        if (data[i].checkedBy.get(userid)) {
          if (data[i].difficulty === "Hard" || data[i].difficulty === "hard")
            values.hard = values.hard + 1;
          else if (data[i].difficulty === "Medium" || data[i].difficulty === "Medium")
            values.medium = values.medium + 1;
          else if (data[i].difficulty === "Easy" || data[i].difficulty === "easy")
            values.easy = values.easy + 1;
          obj.flag = true;
        }
        if (data[i].difficulty === "Hard" || data[i].difficulty === "hard")
          totalvalues.hard = totalvalues.hard + 1;
        else if (data[i].difficulty === "Medium" || data[i].difficulty === "Medium")
          totalvalues.medium = totalvalues.medium + 1;
        else if (data[i].difficulty === "Easy" || data[i].difficulty === "easy")
          totalvalues.easy = totalvalues.easy + 1;

        ans.push(obj);
      }
      res.status(201).json({ error: "", arr: ans, count: values, total: totalvalues });
    }
  })
});

app.post('/api/handleUpdate', (req, res) => {
  const { problemId, token } = req.body;
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
          res.status(201).json({ message: "Done", error: "" });
        }
      })
    }
  })
})


// Problem.create({ difficulty: "Easy", desc: "Distribute Money to Maximum Children", link: "https://leetcode.com/problems/distribute-money-to-maximum-children/", tag: "Greedy", checkedBy: new Array() }, (err, data) => {
//   if (err) console.log(err);
//   else {
//     console.log(data);
//   }
// });