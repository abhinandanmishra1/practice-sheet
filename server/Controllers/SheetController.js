const ProblemSheet = require('../Models/ProblemSheet');
const Sheet = require('../Models/Sheet');
const mongoose = require('mongoose');

const getSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({});
    res.json({
      success: true,
      data: sheets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSheetProblems = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const userId = req.auth.userId;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Find all problems in this sheet with their details
    const result = await ProblemSheet.aggregate([
      {
        $facet: {
          total: [
            {
              $match: {
                sheetId: new mongoose.Types.ObjectId(sheetId)
              }
            },
            {
              $count: "total"
            }
          ],
          data:       [
            {
              $match: {
                sheetId: new mongoose.Types.ObjectId(sheetId)
              }
            },
            {
              $skip: offset,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: "problems",
                localField: "problemId",
                foreignField: "_id",
                as: "problem"
              }
            },
            {
              $unwind: "$problem"
            },
            {
              $lookup: {
                from: "solvedproblems",
                let: { problemId: { $toString: "$problem._id" } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$problemId", "$$problemId"] },
                          { $eq: ["$userId", userId] }
                        ]
                      }
                    }
                  }
                ],
                as: "solvedStatus"
              }
            },
            {
              $lookup: {
                from: "problemfeedbacks",
                let: { problemId: "$problem._id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$problem_id", "$$problemId"] },
                          { $eq: ["$user_id", userId] }
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                      _id: 0,
                      bookmarked: 1,
                      rating: 1,
                      hint: 1,
                      best_time_complexity: 1,
                      createdAt: 1,
                      updatedAt: 1
                    }
                  }
                ],
                as: "feedbackData"
              }
            },
            {
              $project: {
                _id: 0,
                // id: "$problem._id",
                problemId: 1,
                name: "$problem.name",
                problemLink: "$problem.problemLink",
                solved: { $cond: { if: { $gt: [{ $size: "$solvedStatus" }, 0] }, then: true, else: false } },
                feedbackData: { $arrayElemAt: ["$feedbackData", 0] }
              }
            }
          ]
        }
      }
    ]);

    res.json({
      success: true,
      page: {
        total: result[0]?.total[0]?.total || 0,
        limit
      },
      data: result[0]?.data || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addProblemToSheet = async (req, res) => {
  try {
    const { sheetId, problemId } = req.params;

    // Create new problem-sheet relationship
    await ProblemSheet.create({
      problem_id: new mongoose.Types.ObjectId(problemId),
      sheet_id: new mongoose.Types.ObjectId(sheetId),
    });

    res.json({
      success: true,
      message: "Problem added to sheet successfully",
    });
  } catch (error) {
    // Handle duplicate entry gracefully
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Problem is already in this sheet",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeProblemFromSheet = async (req, res) => {
  try {
    const { sheetId, problemId } = req.params;

    await ProblemSheet.findOneAndDelete({
      problem_id: new mongoose.Types.ObjectId(problemId),
      sheet_id: new mongoose.Types.ObjectId(sheetId),
    });

    res.json({
      success: true,
      message: "Problem removed from sheet successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSheetById = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const sheet = await Sheet.findById(new mongoose.Types.ObjectId(sheetId));
    res.json(sheet);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProblemSheets = async (req, res) => {
  try {
    const { problemId } = req.params;

    // Find all sheets that contain this problem
    const problemSheets = await ProblemSheet.find({
      problem_id: new mongoose.Types.ObjectId(problemId)
    })
    .populate('sheet_id')
    .exec();

    // Extract the sheets from the relationships
    const sheets = problemSheets.map(ps => ps.sheet_id);

    res.json({
      success: true,
      data: sheets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSheets,
  getSheetProblems,
  addProblemToSheet,
  removeProblemFromSheet,
  getProblemSheets,
  getSheetById,
};