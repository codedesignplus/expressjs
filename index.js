require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/config");

// Server
const app = express();

// Database
connectDatabase();

// Config CORS
app.use(cors());

// Public Directory
app.use(express.static("public"));

// Read and parse of the Json
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Listen Requests
app.listen(process.env.PORT, () => {
  console.log(`Server runing! ${process.env.PORT}`);
});
