const express = require("express");
const Todo = require("../schemas/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  try {
    const savedData = await newTodo.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ error: "There is no task at that id"});
  }
});

router.delete("/:todoId", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.status(200).json("Task deleted successfully");
  } catch (err) {
    res.status(500).json({ message: "There is no task with that Id" });
  }
});

router.put("/:todoId", async (req, res) => {
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.todoId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({error:"There was no task with that Id"});
  }
});

module.exports = router;
