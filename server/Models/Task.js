const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  taskDate: String,
  completionTime: String, // "completed" | "working" | "rescheduled" | "deleted"
  status: String,
  description: String
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task
