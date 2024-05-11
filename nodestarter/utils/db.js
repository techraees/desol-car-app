import mongoose from "mongoose";

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI
const mongodbURI =
  "mongodb+srv://techraees786:tdd49z3EIUsw00EP@cluster0.uadhgij.mongodb.net/CarService";

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

export default connectDB;
