const express = require("express");
const cors = require("cors");
const path = require("path");

const employeeRoutes = require("./Routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the built React app
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// API Routes
app.use("/api/employees", employeeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// SPA Fallback - Serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for actual API error paths
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientDistPath, "index.html"));
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = app;