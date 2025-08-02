const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model.js");

const { isValidLaunch } = require("../../../dtos/launches.dtos.js");
//get launches from DB
async function httpGetAllLaunches(req, res) {
  
  return res.status(200).json({
    data: {
      launches: await getAllLaunches(),
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
  //if launch doesn't exist
  const existsLaunch = await existLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if(!aborted){
    return res.status(400).json({
      error: "Launch not aborted",
    })
  }
  //if launch does exist
  return res.status(200).json({
    ok: true,
  })
}

module.exports = { 
  httpGetAllLaunches,
  httpAddNewLaunch, 
  httpAbortLaunch 
};
