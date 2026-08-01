const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./Routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Employee Management API Running..." });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;