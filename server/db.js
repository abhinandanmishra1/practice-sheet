const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME

mongoose
  .connect(MONGO_URI, {
    dbName: DB_NAME
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
