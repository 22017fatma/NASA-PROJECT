const { launchesModel } = require("../../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(launchesModel.getAllLaunches());
}

module.exports = {
  httpGetAllLaunches,
};
