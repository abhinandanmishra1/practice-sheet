const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { clerkMiddleware } = require('@clerk/express');

require("./db");

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add Clerk middleware to parse auth tokens
app.use(clerkMiddleware());

// Routes imports
const problemRoutes = require("./Routes/ProblemRoutes");
const solvedProblemsRoutes = require("./Routes/SolvedProblemsRoutes");

const PORT = process.env.PORT || 5001;

// Health check route
app.get("", (req, res) => {
  res.send("Server is running!");
});

// API routes
app.use("/problems", problemRoutes);
app.use("/solved", solvedProblemsRoutes);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});