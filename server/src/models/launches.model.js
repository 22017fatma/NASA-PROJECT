const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const { AppError } = require("../utils/AppError.utils");
const DEFUALT_FLIGHT_NUMBER = 100;
const launches = new Map();

let latestFlightNumber = 100;

//GET launches in spacex
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
async function populateLaunches() {
  console.log("Dawnloading launch data...");
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1
            }
          },
          {
            path: "payloads",
            select: {
              "customer": 1
            }
          }
        ]
      }
    })
    if (response.status !== 200) {
      console.log("problem dawnloading launch data");
      throw new AppError("launch data dawnload failed");
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
      const payloads = launchDoc['payloads'];
      const customers = payloads.flatMap((payload) => {
        return payload['customers'];
      });
      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers,
      };
      // console.log(`${launch.flightNumber} ${launch.mission}`);
      //populate launches collection...
      await saveLuanches(launch);
    }
  } catch (err) {
    throw err;
  }
}


async function loadLaunchData() {

  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconsSat"
  });
  if(firstLaunch){
    console.log("Launch data already loaded");
  }else{
    await populateLaunches();
  }
}
  
async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber:  launchId,
  });
}


async function getAllLaunches(skip, limit) {
  return await launchesDatabase
  .find({}, { "__v":0})
  .sort({ flightNumber: 1 })
  .skip(skip)
  .limit(limit);
}


async function saveLuanches(launch){

  // console.log("saveLuanches")
  // //validate the planet
  // const planet = await planets.findOne({
  //   keplerName: launch.target,
  // });
  // if(!planet){
  //   throw new Error("No match planet found");
  // }
    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    });
}

//Getting Latest Flight Number
async function getLatestFlightNumber(){
  const latestLaunch = await launchesDatabase
    .findOne()
    .sort("-flightNumber");
      
      if(!latestLaunch){
          return DEFUALT_FLIGHT_NUMBER;
      }
    return latestLaunch.flightNumber;
}

// # Scheduling New Launches
// depend on DB
async function scheduleNewLaunch(launch){
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
  });
  await saveLuanches(newLaunch);
}
//depend on map()
// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       success: true,
//       upcoming: true,
//       customer: ["ZTM", "NASA"],
//     })
//   );
// }


async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });
      return aborted.modifiedCount === 1;
  // return aborted.ok === 1 && aborted.nModified === 1;


  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
}





module.exports = {
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,

};
