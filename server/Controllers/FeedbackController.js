const ProblemFeedback = require('../Models/ProblemFeedback');
const mongoose = require('mongoose');

const updateProblemFeedback = async (req, res) => {
  try {
    const { problem_id } = req.params;
    const problemId = new mongoose.Types.ObjectId(problem_id);
    const user_id = req.auth.userId;
    const updateData = req.body;

    // Validate required fields
    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID is required'
      });
    }

    // Remove any fields that are undefined or null
    // Object.keys(updateData).forEach(key => {
    //   if (updateData[key] === undefined || updateData[key] === null) {
    //     delete updateData[key];
    //   }
    // });

    // Use findOneAndUpdate with upsert option to create if not exists
    const feedback = await ProblemFeedback.findOneAndUpdate(
      { user_id, problem_id: problemId },
      { $set: updateData },
      { 
        new: true, // Return updated document
        upsert: true, // Create if doesn't exist
        runValidators: true // Run schema validations on update
      }
    );

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already exists for this user and problem'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProblemFeedback = async (req, res) => {
  try {
    const { problem_id } = req.params;
    const problemId = new mongoose.Types.ObjectId(problem_id);
    const user_id = req.auth.userId;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID is required'
      });
    }

    const feedback = await ProblemFeedback.findOne({ user_id, problem_id: problemId });

    res.status(200).json({
      success: true,
      data: feedback || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateProblemFeedback,
  getProblemFeedback
};