import mongoose from "mongoose";

// Define CarModel schema
const carModelSchema = new mongoose.Schema({
  car_model: String,
  price: Number,
  phone: String,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Referencing the City model
  },
  no_of_copies: Number,
  images_array: [String], // Assuming images_array is an array of strings (image URLs)
});

const CarModel = mongoose.model("CarModel", carModelSchema);

export default CarModel;
