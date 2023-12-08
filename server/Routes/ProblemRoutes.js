const { fetchProblems } = require('../Controllers/ProblemsController');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await fetchProblems();
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
});

module.exports = router;