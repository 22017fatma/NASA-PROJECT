const http = require("http");
const { app } = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose =require('mongoose');
console.log("ENVIRONMENT:", process.env.NODE_ENV);

const PORT = process.env.PORT || 8000;

const MONGO_URL='mongodb+srv://nasa-api:LdmLS25aPT5GEMKU@cluster0.e4waubx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const server = http.createServer(app);

mongoose.connection.on('open', ()=>{
  console.log("MongoDB Connection ready!")
});
mongoose.connection.on('error',(err)=>{
  console.error(err);
});
async function startServer() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreatIndex: true,
      useUnifiedTopolgy: true,
    });
    await loadPlanetsData();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Failed to load planets data:", error);
  }
}

startServer();
