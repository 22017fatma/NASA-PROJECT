"use strict";
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const { planetsRouter } = require("./routes/planets/planets.router");
const { launchesRouter } = require("./routes/launches/launches.router");
const { globalErrorHandler } = require("./utils/errorHandler.utils");

dotenv.config();

const app = express();

app.use(morgan("dev")); // Logging middleware

app.use(
  cors({
    origin: "*", // Adjust the origin as needed
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/planets", planetsRouter);
app.use("/api/launches", launchesRouter);

app.use("*route", (req, _res, _next) => {
  throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.get("/api/*route", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(globalErrorHandler);

module.exports = { app };
