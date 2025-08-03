const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFUALT_FLIGHT_NUMBER = 100;
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
saveLuanches(launch);
// Initialize the map with the launch data
// launches.set(launch.flightNumber, launch);


async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber:  launchId,
  });
}


async function getAllLaunches() {
  return await launchesDatabase
  .find({}, { "__v":0});
}


async function saveLuanches(launch){

  console.log("saveLuanches")
  //validate the planet
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if(!planet){
    throw new Error("No match planet found");
  }
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
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
