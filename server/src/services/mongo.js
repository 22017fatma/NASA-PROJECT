const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL_ONLINE;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

async function connectToMongo() {
    console.log("Trying to connect to:", MONGO_URL); 
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connectToMongo,
  mongoDisconnect,
};
