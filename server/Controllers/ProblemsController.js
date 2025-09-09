const { Problem } = require("../Models/Problems");
const { problemIds } = require("../Data");
const { getProblemNameFromId } = require("../Helpers/problemHelper");
const { default: mongoose } = require("mongoose");

const fetchProblems = async (userId, offset = 0, limit = 10, sheetId = null) => {
  const matchStage = sheetId
    ? [{ $match: { sheet: new mongoose.Types.ObjectId(sheetId) } }]
    : [];

  const result = await Problem.aggregate([
    {
      $facet: {
        total: [
          ...matchStage,
          {
            $count: "total",
          },
        ],
        data: [
          ...matchStage,
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: "solvedproblems",
              let: { problemId: { $toString: "$_id" } },
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
              let: { problemId: "$_id" },
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
              name: 1,
              problemLink: 1,
              sheet: 1,
              id: "$_id",
              _id: 0,
              solved: { $cond: { if: { $gt: [{ $size: "$solvedStatus" }, 0] }, then: true, else: false } },
              feedbackData: { $arrayElemAt: ["$feedbackData", 0] }
            },
          },
        ],
      },
    },
  ]); 

  return {
    page: {
      total: result?.[0]?.total?.[0]?.total || [0],
      limit
    },
    problems: result?.[0]?.data || []
  };
};

const addProblems = async () => {
  // This method is implemented to insert problems in database
  try {
    const problemsData = problemIds.reduce((result, curr) => {
      result.push({ name: getProblemNameFromId(curr), problemId: curr });

      return result;
    }, []);

    await Problem.insertMany(problemsData);
    console.log("Successfully inserted problems");
  } catch (err) {
    console.log("Error in inserting problems");
    console.log(err);
  }
};

module.exports = {
  fetchProblems,
  addProblems,
};
