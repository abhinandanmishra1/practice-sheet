const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const { getSolvedProblems, toggleProblemSolved } = require('../Controllers/SolvedProblemsController');

// All routes require authentication
router.use(requireAuth);

// Get all solved problems for the authenticated user
router.get('/', getSolvedProblems);

// Toggle problem solved status
router.post('/toggle', toggleProblemSolved);

module.exports = router;
