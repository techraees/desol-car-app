const CarModel = require("../models/carModel");


exports.createCarModel = async (req, res) => {
  try {
    const { car_model, price, phone, city, no_of_copies } = req.body;
    const images = req.files; // Assuming images are sent as files in the request

    // Ensure images are present
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({
          status: "fail",
          payload: {
            error_message: "At least one image is required",
            error_code: "BAD_REQUEST",
          },
        });
    }

    // Save images to storage and collect their URLs
    const imageUrls = images.map((image) => `/uploads/${image.filename}`);

    // Create a new car model with image URLs
    const newCarModel = await CarModel.create({
      car_model,
      price,
      phone,
      city,
      no_of_copies,
      images_array: imageUrls,
    });

    res.status(201).json({ status: "success", payload: newCarModel });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "fail",
        payload: {
          error_message: err.message,
          error_code: "INTERNAL_SERVER_ERROR",
        },
      });
  }
};


// Get all car models
exports.getAllCarModels = async (req, res) => {
  try {
    const carModels = await CarModel.find();
    res.json(carModels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a car model by ID
exports.deleteCarModel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCarModel = await CarModel.findByIdAndDelete(id);
    if (!deletedCarModel) {
      return res.status(404).json({ error: "Car model not found" });
    }
    res.json({ message: "Car model deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
