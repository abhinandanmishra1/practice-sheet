const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const { getSolvedProblems, toggleProblemSolved } = require('../Controllers/SolvedProblemsController');

// All routes require authentication
router.use(requireAuth());

// Toggle problem solved status
router.post('/toggle', toggleProblemSolved);

module.exports = router;
