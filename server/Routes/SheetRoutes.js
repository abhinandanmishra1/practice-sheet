const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const { getSheets, getSheetById } = require('../Controllers/SheetController');

// All routes require authentication
router.use(requireAuth());

// Get all sheets
router.get('/', getSheets);

router.get("/:id", getSheetById);

module.exports = router;
