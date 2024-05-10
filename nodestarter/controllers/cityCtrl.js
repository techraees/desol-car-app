const City = require("../models/cityModel");

// Create a new city
exports.createCity = async (req, res) => {
  try {
    const { name } = req.body;
    const newCity = await City.create({ name });
    res.status(201).json({ status: "success", payload: { newCity } });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json({ status: "success", payload: { cities } });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// Get a city by ID
exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).json({
        status: "fail",
        payload: { error_message: "City not found", error_code: "NOT_FOUND" },
      });
    }
    res.json({ status: "success", payload: { city } });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCity) {
      return res.status(404).json({
        status: "fail",
        payload: { error_message: "City not found", error_code: "NOT_FOUND" },
      });
    }
    res.json({ status: "success", payload: { updatedCity } });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({
        status: "fail",
        payload: { error_message: "City not found", error_code: "NOT_FOUND" },
      });
    }
    res.json({
      status: "success",
      payload: { message: "City deleted successfully" },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
