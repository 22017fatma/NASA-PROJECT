const API_URL="http://localhost:8000/api";

async function httpGetPlanets() {
    // TODO: Once API is ready.
    // Load planets and return as JSON.
    const response = await fetch(`${API_URL}/planets`)
    const res = await response.json();
    return res.data.planets; 

  
}


async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  const launches = fetchedLaunches.data.launches;
  return launches.sort((a,b)=>{
    return a.flightNumber - b.flightNumber;
  });
}


async function httpSubmitLaunch(launch) {
  try{

      return await fetch(`${API_URL}/launches`,{
    method: "post",
    headers:{
      "Content-Type" : "application/json",
    },
    body:JSON.stringify(launch),
  
  });
}catch(err){
  return {
  ok:false,
  };
}
}

async function httpAbortLaunch(id) {
  try{
      return await fetch(`${API_URL}/launches/${id}`,{
      method: "delete",
        });
  }catch(err){
    console.log(err);
    return{
    ok: false,
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};