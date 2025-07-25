
import { getAllLaunches ,addNewLaunch,existLaunchWithId,abortLaunchById} from "../../models/launches.model.js";
import { aborted } from "util";

function httpGetAllLaunches(req,res){ 
    return res.status(200).json(getAllLaunches());

}
function httpAddNewLaunch(req,res){
    const launch= req.body;

    if(!launch.mission || !launch.rocket ||!launch.launchDate ||!launch.target){
        return res.status(400).json({
            error:'missing required launch property',
        })
    }
    launch.launchDate=new Date (launch.launchDate);

//    if (new Date(launchDate).toString() === 'Invalid Date') {
//   return res.status(400).json({
//     error: 'Invalid launch date',
//   });
//     }
// 
    //valid date
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"Invalid launch date",
        })
    }

    addNewLaunch(launch);
    res.status(201).json(launch);
}
function httpAbortLaunch(req,res){
  const launchId=Number(req.param.id);
  //if launch doesn't exist
  if(!existLaunchWithId(launchId)){
  return res.status(404).json({
    error:'launch not found',
  });
}
const aborted=abortLaunchById(launchId);

  //if launch does exist
  return res.status(200).json(aborted)
}

export{
    httpGetAllLaunches,
     httpAddNewLaunch ,
     httpAbortLaunch
}
