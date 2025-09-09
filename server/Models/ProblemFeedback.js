const mongoose = require('mongoose');

const problemFeedbackSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
    index: true
  },
  bookmarked: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false
  },
  hint: {
    type: String,
    required: false
  },
  best_time_complexity: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Compound index for unique (user_id, problem_id) pairs
problemFeedbackSchema.index({ user_id: 1, problem_id: 1 }, { unique: true });

const ProblemFeedback = mongoose.model('ProblemFeedback', problemFeedbackSchema);

module.exports = ProblemFeedback;
