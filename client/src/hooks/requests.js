const API_URL='http://localhost:8000/api';

async function httpGetPlanets() {
    // TODO: Once API is ready.
    // Load planets and return as JSON.
    const response = await fetch(`${API_URL}/planets`)
    const res = await response.json();
    return res.data.planets; 

  
}


async function httpGetLaunches() {
  const response =await fetch (`${API_URL}/launches`);
  const fetchedLaunches= await response.json();
  const launches = fetchedLaunches.data.launches;
  return launches.sort((a,b)=>{
    return a.flightNumber - b.flightNumber;
  });
}


async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};