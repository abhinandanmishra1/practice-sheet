const SolvedProblem = require('../Models/SolvedProblem');

const getSolvedProblems = async (req, res) => {
  try {
    const solvedProblems = await SolvedProblem.find({ userId: req.user._id });
    res.json({ solvedProblems: solvedProblems.map(sp => sp.problemId) });
  } catch (error) {
    console.error('Error getting solved problems:', error);
    res.status(500).json({ error: 'Failed to get solved problems' });
  }
};

const toggleProblemSolved = async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ error: 'Problem ID is required' });
    }

    const existingSolved = await SolvedProblem.findOne({
      userId: req.user._id,
      problemId
    });

    if (existingSolved) {
      // If problem was already marked as solved, remove it
      await SolvedProblem.deleteOne({ _id: existingSolved._id });
      res.json({ solved: false, message: 'Problem marked as unsolved' });
    } else {
      // Mark problem as solved
      await SolvedProblem.create({
        userId: req.user._id,
        problemId
      });
      res.json({ solved: true, message: 'Problem marked as solved' });
    }
  } catch (error) {
    console.error('Error toggling problem solved status:', error);
    res.status(500).json({ error: 'Failed to update problem status' });
  }
};

module.exports = {
  getSolvedProblems,
  toggleProblemSolved
};
