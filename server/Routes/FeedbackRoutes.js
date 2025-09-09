const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const { updateProblemFeedback, getProblemFeedback } = require('../Controllers/FeedbackController');

// All routes require authentication
router.use(requireAuth());

// Route to update or create a feedback
router.put('/:problem_id', updateProblemFeedback);

// Route to get a specific feedback
router.get('/:problem_id', getProblemFeedback);

module.exports = router;