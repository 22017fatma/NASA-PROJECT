const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { AppError } = require("../utils/AppError.utils");
const planets = require('./planets.mongo');
const { get } = require("mongoose");

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
      .on("data", async (data) => {
        if (isHabitablePlanet(data))
        {
          //TODO:Replace below creat with insert + update = upsert
          savePlenets(data);
          //Creat Decument in DB
        }
      })
      .on("error", (err) => {
        reject(new AppError("Failed to parse CSV file", 500, err));
      })
      .on("end", async () => {
        const countPlanetsFound= (await getAllPlanets()).length;
        // console.log(habitablePlanets.map((planet) => planet["kepler_name"]));
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

  async function getAllPlanets(){
  return await planets.find({}, {
    '__v': 0,
  });
}
async function savePlenets(planet){
  try{
          //TODO:Replace below creat with insert + update = upsert
          await planets.updateOne({
          keplerName: planet.kepler_name,
          }, {
          keplerName: planet.kepler_name,
          }, {
            upsert: true,
          });
        
    }catch(err){
          console.error(`could not save planet ${err}`)
      }
    }

module.exports = {
  habitablePlanets,
  loadPlanetsData,
  getAllPlanets,
};
