const { fetchProblems } = require('../Controllers/ProblemsController');
const { requireAuth } = require('@clerk/express');
const express = require('express');
const router = express.Router();

router.use(requireAuth())

router.get('/', async (req, res) => {
    try {
        const queryParams = req.query;
        
        const limit = parseInt(queryParams.limit);
        const offset = parseInt(queryParams.offset);
        const sheetId = queryParams.sheetId;

        const result = await fetchProblems(req.auth.userId, offset, limit, sheetId);
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
});

module.exports = router;
