
const launches=new Map();
let latestFlightNumber=100;
const launch={
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming: true,
    success: true,

};

// Initialize the map with the launch data
launches.set(launch.flightNumber,launch);

function existLaunchWithId(launchId){
  return launch.has(launchId);
}
function getAllLaunches(){
    return Array.from(launches.values());

}

function addNewLaunch(launch){
  latestFlightNumber++;
  launches.set(latestFlightNumber,
    Object.assign(launch,{
      flightNumber:latestFlightNumber,
      success:true,
      upcoming:true,
      customer:['ZTM','NASA'],
  })
);
}

function abortLaunchById(launchId){
 const aborted= launches.get(launchId);
 aborted.upcoming = false;
 aborted.success = false;
 return aborted;
}
export{
    
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById
};