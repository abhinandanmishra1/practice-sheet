import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sheet from '../Models/Sheet';
import { Problem } from '../Models/Problems';
import ProblemSheet from '../Models/ProblemSheet';

// Load environment variables
dotenv.config();

// Sample data
const sampleSheets = [
  {
    name: "Dynamic Programming",
    description: "Practice problems focused on Dynamic Programming concepts"
  },
  {
    name: "Graph Algorithms",
    description: "Essential graph problems and algorithms"
  },
  {
    name: "Array Problems",
    description: "Fundamental array manipulation problems"
  }
];

const sampleProblems = [
  {
    name: "Two Sum",
    problemId: "1",
    problemLink: "https://leetcode.com/problems/two-sum/",
    platform: "LeetCode"
  },
  {
    name: "Longest Common Subsequence",
    problemId: "1143",
    problemLink: "https://leetcode.com/problems/longest-common-subsequence/",
    platform: "LeetCode"
  },
  {
    name: "DFS Implementation",
    problemId: "dfs-implementation",
    problemLink: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
    platform: "GeeksForGeeks"
  }
];

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/practice-sheet');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Sheet.deleteMany({}),
      Problem.deleteMany({}),
      ProblemSheet.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert sheets
    const sheets = await Sheet.insertMany(sampleSheets);
    console.log('Inserted sample sheets');

    // Insert problems
    const problems = await Problem.insertMany(sampleProblems);
    console.log('Inserted sample problems');

    // Create some problem-sheet relationships
    const problemSheetRelations = [
      {
        problemId: problems[0]._id, // Two Sum in Array Problems
        sheetId: sheets[2]._id
      },
      {
        problemId: problems[1]._id, // LCS in DP
        sheetId: sheets[0]._id
      },
      {
        problemId: problems[2]._id, // DFS in Graph
        sheetId: sheets[1]._id
      }
    ];

    await ProblemSheet.insertMany(problemSheetRelations);
    console.log('Created problem-sheet relationships');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the initialization
initializeDatabase();