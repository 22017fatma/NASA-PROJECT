const { getAllPlanets } = require("../../models/planets.model");
const { AppError } = require("../../utils/AppError.utils");

async function httpGetAllPlanets(req, res, next) {
  console.log("httpGetAllPlanets");
  try {
    const planets = await getAllPlanets();
    if (planets?.length > 0) {
      res.status(200).json({
        status: "success",
        data: {
          planets,
        },
      });
    } else {
      // If no habitable planets are found, throw an error
      throw new AppError("No habitable planets found", 404);
    }
  } catch (error) {
    console.error("Error in getAllPlanets:", error.message);
    next(error);
  }
}

module.exports = {
  httpGetAllPlanets,
};