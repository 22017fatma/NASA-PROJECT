
const launches=new Map();
let latestFlightNumber=100;
const launch={
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    distination: 'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming: true,
    success: true,

};
// Initialize the map with the launch data
launches.set(launch.flightNumber,launch);
function getAllLaunches(){
    return Array.from(launches.values());

}

function addNewLaunch(launch){
  latestFlightNumber++;
  launches.set(launches.flightNumber,
    Object.assign(launch,{
      success:true,
      upcoming:true,
      customer:['Zero to Mastry','NASA'],
      flightNumber:latestFlightNumber,

  })
);
}
export{
    
  getAllLaunches,
  addNewLaunch
};