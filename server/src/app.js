"use strict";
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const { globalErrorHandler } = require("./utils/errorHandler.utils");

const api = require("./routes/api");
dotenv.config();

const app = express();
//[2] use helmet
app.use(helmet());

app.use(morgan("dev")); // Logging middleware

app.use(
  cors({
    origin: "*", // Adjust the origin as needed
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

// app.use("*route", (req, _res, _next) => {
//   throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
// });

app.get("*route", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(globalErrorHandler);

module.exports = { app };
