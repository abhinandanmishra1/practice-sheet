const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  problemId: {
    type: String,
    index: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = {
  Problem,
};
