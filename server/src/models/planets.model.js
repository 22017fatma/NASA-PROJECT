const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { AppError } = require("../utils/AppError.utils");


const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "data",
      "kepler_data.csv"
    );

    console.log(filePath);

    fs.createReadStream(filePath)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        reject(new AppError("Failed to parse CSV file", 500, err));
      })
      .on("end", () => {
        console.log(habitablePlanets.map((planet) => planet["kepler_name"]));
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

module.exports = {
  habitablePlanets,
  loadPlanetsData,
};
