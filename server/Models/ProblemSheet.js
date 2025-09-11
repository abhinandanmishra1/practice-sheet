const mongoose = require('mongoose');

const problemSheetSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
    index: true
  },
  sheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sheet',
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique problem-sheet pairs
problemSheetSchema.index({ problemId: 1, sheetId: 1 }, { unique: true });

const ProblemSheet = mongoose.model('ProblemSheet', problemSheetSchema);

module.exports = ProblemSheet;
