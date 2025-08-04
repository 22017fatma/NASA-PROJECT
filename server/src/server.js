require("dotenv").config(); 
const http = require("http");
const { app } = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const{loadLaunchData} = require("./models/launches.model")
const {connectToMongo} = require("./services/mongo")
console.log("ENVIRONMENT:", process.env.NODE_ENV);

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);

async function startServer() {
  try {

    await connectToMongo();
    await loadPlanetsData();
    await loadLaunchData();//
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Failed to load planets data:", error);
  }
}

startServer();
