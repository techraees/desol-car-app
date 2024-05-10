const mongoose = require("mongoose");

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI
const mongodbURI =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/CarService";

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.connect(mongodbURI);
    console.log('MongoDb Connected Successfullt')
  } catch (error) {
    throw new Error(error);
    console.log('MongoDb Not Connected')

  }
};

module.exports = connectDB;
