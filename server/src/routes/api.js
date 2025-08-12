const express = require("express");
const { planetsRouter } = require("./planets/planets.router");
const { launchesRouter } = require("./launches/launches.router");
const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);
api.use("/*route", (req, _res, _next) => {
  throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
});

module.exports = api;
