const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL);

}

module.exports = {
    connectToMongo,
};

