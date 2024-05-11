import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: String,
  // Add any other properties related to a city
});

const City = mongoose.model("City", citySchema);
export default City;
