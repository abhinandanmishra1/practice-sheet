const mongoose = require('mongoose');

const solvedProblemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: String,
    required: true
  },
  solvedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can't mark the same problem as solved multiple times
solvedProblemSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const SolvedProblem = mongoose.model('SolvedProblem', solvedProblemSchema);

module.exports = SolvedProblem;
