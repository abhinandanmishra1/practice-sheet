const { fetchProblems } = require('../Controllers/ProblemsController');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const queryParams = req.query;

        const limit = parseInt(queryParams.limit);
        const offset = parseInt(queryParams.offset);

        console.log(limit, offset, req.params)

        const result = await fetchProblems(offset, limit);
        console.log("yess")
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
});

module.exports = router;