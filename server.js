const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Health check
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

// Port
const port = process.env.PORT || 8080;

// Listen
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE || "development"} Mode on port ${port}`
  );
});