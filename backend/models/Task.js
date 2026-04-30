const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "To-Do"
  },
  deadline: Date
});

module.exports = mongoose.model("Task", taskSchema);