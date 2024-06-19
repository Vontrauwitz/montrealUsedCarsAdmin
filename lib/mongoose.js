import mongoose from "mongoose";

async function connectToMongoose() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection; // Already connected, just return the connection
    }

    const uri = process.env.MONGODB_URI; // Use process.env for secure storage
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }

    await mongoose.connect(uri); // Simplificado, sin opciones obsoletas

    console.log("Successfully connected to MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to allow proper handling
  }
}

export default connectToMongoose;
