const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

require("./db");
// const { addProblems } = require("./Controllers/ProblemsController");

// routes imports
const problemRoutes = require("./Routes/ProblemRoutes");
const taskRouter = require("./Routes/TaskRouter");

const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  // await addProblems()
});

app.get("", (req, res) => {
  res.send("Server is running!")
})

app.use("/problems", problemRoutes);
// app.use("/tasks", taskRouter);