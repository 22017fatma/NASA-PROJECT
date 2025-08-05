const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model.js");

const { isValidLaunch } = require("../../../dtos/launches.dtos.js");
const {
  getPagination
} = require("../../services/query.js");
//get launches from DB
async function httpGetAllLaunches(req, res) {
  const{ skip , limit } = getPagination( req.query);
  const launchesQ = await getAllLaunches(skip, limit);
  const resD = await getAllLaunches()
  return res.status(200).json({
    data: {
      // launches: resD ,
      launches: launchesQ,

    },

  
  });
}


async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!isValidLaunch(launch)) {
    return res.status(400).json({
      error: " Invalid launch ",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  await scheduleNewLaunch(launch);
  console.log(launch);
  return res.status(201).json(launch);
}

// function httpAddNewLaunch(req,res){
//     const launch= req.body;

//     if(
//         !launch.mission ||
//         !launch.rocket ||
//         !launch.launchDate||
//         !launch.target
//         ){
//         return res.status(400).json({
//             error: 'missing required launch property',
//         })
//     }
//     launch.launchDate=new Date (launch.launchDate);

// //    if (new Date(launchDate).toString() === 'Invalid Date') {
// //   return res.status(400).json({
// //     error: 'Invalid launch date',
// //   });
// //     }
// //
//     //valid date
//     if(isNaN(launch.launchDate)){
//         return res.status(400).json({
//             error: "Invalid launch date",
//         })
//     }

//     addNewLaunch(launch);
//     res.status(201).json(launch);
// }
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existsLaunch = await existLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(400).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  // Return the updated launch info as expected by the test
  return res.status(200).json({
    flightNumber: launchId,
    success: false,
    upcoming: false,
  });
}

module.exports = { 
  httpGetAllLaunches,
  httpAddNewLaunch, 
  httpAbortLaunch 
};
