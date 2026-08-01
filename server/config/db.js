const mongoose = require("mongoose");

const getMongoUri = () => process.env.MONGO_URI || process.env.MONGODB_URI;

const connectDB = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MONGO_URI or MONGODB_URI is required in production.");
    }

    console.warn("MONGO_URI not set. Continuing in development mode with in-memory storage.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }

    console.warn("MongoDB connection failed. Continuing in development mode:", error.message);
  }
};

module.exports = connectDB;
module.exports.getMongoUri = getMongoUri;