const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: {
    type: String,
    default: "Active"
  },
  deadline: Date
});

module.exports = mongoose.model("Project", projectSchema);