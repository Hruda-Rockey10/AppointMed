const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Load env vars
// Assuming .env is in the root of the project (AppointMed/.env)
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Connect to database
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(`[DEBUG] Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running successfully",
  });
});

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../../client/dist");
  console.log("Client Path:", clientPath);
  
  try {
    const fs = require('fs');
    if (fs.existsSync(clientPath)) {
      console.log("Client dist contents:", fs.readdirSync(clientPath));
      const assetsPath = path.join(clientPath, 'assets');
      if (fs.existsSync(assetsPath)) {
         console.log("Client assets contents:", fs.readdirSync(assetsPath));
      } else {
         console.log("Assets directory not found at:", assetsPath);
      }
    } else {
      console.log("Client dist directory not found at:", clientPath);
    }
  } catch (err) {
    console.error("Error checking client files:", err);
  }

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// Port
const port = process.env.PORT || 8080;

// Listen
app.listen(port, () => {
  console.log(
    `Server Running in ${
      process.env.NODE_MODE || "development"
    } Mode on port ${port}`.bgCyan.white
  );
});
