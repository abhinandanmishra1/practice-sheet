const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

require("./db");
// const { addProblems } = require("./Controllers/ProblemsController");

// routes imports
const problemRoutes = require("./Routes/ProblemRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  // await addProblems()
});

app.get("", (req, res) => {
  res.send("Server is running!")
})

app.use("/problems", problemRoutes);