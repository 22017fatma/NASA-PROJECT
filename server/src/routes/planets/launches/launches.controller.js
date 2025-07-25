import { launchesModel } from "../../../models/launches.model.js";

function httpGetAllLaunches(req,res){ 
    return res.status(200).json(launchesModel.getAllLaunches());

}

export{
    httpGetAllLaunches,
}
