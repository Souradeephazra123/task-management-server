import mongoose from "mongoose";

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo");
  } catch (error) {
    console.error("Error connecting to Mongo", error);
  }
}

export { connectToMongo };
