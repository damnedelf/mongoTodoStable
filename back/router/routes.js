let express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const mongoose = require("mongoose");
const todo = require("../models/todo_model");
let textParser = bodyParser.text();
mongoose.connect("mongodb://localhost/toDoCollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("connection to db is up");
  })
  .on("error", function (error) {
    console.log("error>>>>>>", error);
  });

router.post("/post", textParser, function (req, res) {
  let person = new todo({
    name: req.body,
    id: nanoid(),
    isCompleted: false,
  });

  try {
    let currentTodo = {
      name: person.name,
      id: person.id,
      isCompleted: person.isCompleted,
    };
    person.save().then(res.end(JSON.stringify(currentTodo)));
  } catch (error) {
    res.write(`Some error ${error}`);
    res.end();
  }
});
router.get("/getall", function (req, res) {
  try {
    todo.find({}).then(function (result) {
      res.end(JSON.stringify(result));
    });
  } catch (error) {
    res.write(`get array from db ${error}`);
    res.end();
  }
});
router.delete("/delete", textParser, function (req, res) {
  try {
    todo.findOneAndRemove({ id: req.body }).then(() => res.end());
  } catch (error) {
    res.write(`error ${error}`);
    res.end();
  }
});
router.patch("/patch", textParser, function (req, res) {
  try {
    todo.findOne({ id: req.body }).then(function (result) {
      todo
        .findOneAndUpdate(
          { id: req.body },
          { $set: { isCompleted: !result.isCompleted } }
        )
        .then(() => res.end());
    });
  } catch (error) {
    res.write(`error ${error}`);
    res.end();
  }
});
router.put("/put", textParser, function (req, res) {
  let condition = req.body;
  try {
    todo
      .updateMany({}, { $set: { isCompleted: condition } })
      .then(() => res.end());
  } catch (error) {
    res.write(`all updated error ${error}`);
    res.end();
  }
});
module.exports = router;
