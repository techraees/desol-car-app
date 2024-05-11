import mongoose from "mongoose";

// Define CarModel schema
const carModelSchema = new mongoose.Schema(
  {
    car_model: String,
    price: Number,
    phone: String,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City", 
    },
    no_of_copies: Number,
    images_array: [String],
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    }
  },
  { timestamps: true }
);

const CarModel = mongoose.model("CarModel", carModelSchema);

export default CarModel;
