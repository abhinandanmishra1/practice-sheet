const { Problem } = require("../Models/Problems");
const { problemIds } = require("../Data");
const { getProblemNameFromId } = require("../Helpers/problemHelper");

const fetchProblems = async (offset = 0, limit = 10) => {
  const result = await Problem.aggregate([
    {
      $facet: {
        total: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
          {
            $project: {
              name: 1,
              problemLink: 1,
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

    console.log(problemsData);

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
