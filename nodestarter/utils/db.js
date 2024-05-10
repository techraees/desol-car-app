const mongoose = require("mongoose");

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI
const mongodbURI = process.env.MONGODB_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.connect(mongodbURI);
    console.log("MongoDb Connected Successfullt");
  } catch (error) {
    console.log("MongoDb Not Connected");
    // throw new Error(error);
  }
};

module.exports = connectDB;
