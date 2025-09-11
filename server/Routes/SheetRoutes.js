const express = require("express");
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const {
  getSheets,
  getSheetProblems,
  getSheetById,
  addProblemToSheet,
  removeProblemFromSheet,
  getProblemSheets,
} = require("../Controllers/SheetController");

// All routes require authentication
router.use(requireAuth());

// Get all sheets
router.get("/", getSheets);

// Get all problems in a sheet
router.get("/:sheetId/problems", getSheetProblems);

// Get a sheet by id
router.get("/:sheetId", getSheetById);

// Get all sheets containing a problem
router.get("/problem/:problemId", getProblemSheets);

// Add a problem to a sheet
router.post("/:sheetId/problems/:problemId", addProblemToSheet);

// Remove a problem from a sheet
router.delete("/:sheetId/problems/:problemId", removeProblemFromSheet);

module.exports = router;