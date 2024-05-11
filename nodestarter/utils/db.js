import mongoose from "mongoose";
import chalk from "chalk";

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI
const mongodbURI =
  "mongodb+srv://techraees786:tdd49z3EIUsw00EP@cluster0.uadhgij.mongodb.net/CarService";
// const mongodbURI =
//   "mongodb://127.0.0.1:27017/CarService";

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.connect(mongodbURI);
    console.log(
      chalk.bgMagentaBright.bold.underline("Coneected DB Sucessfully")
    );
  } catch (error) {
    console.log("MongoDb Not Connected");
    // throw new Error(error);
  }
};

export default connectDB;
