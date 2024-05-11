import CarModel from "../models/carModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const createCarModel = async (req, res) => {
  try {
    console.log("start");
    const { car_model, price, phone, city, no_of_copies } = req.body;
    const userEmail = req.body.email; // Assuming the email is in req.body.email
    const images = req.files;

    // Ensure images are present
    if (!images || images.length === 0) {
      return res.status(400).json({
        status: "fail",
        payload: {
          error_message: "At least one image is required",
          error_code: "BAD_REQUEST",
        },
      });
    }

    // Create a folder with the user's email address if it doesn't exist
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const userFolder = path.join(__dirname, "uploads", userEmail);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    // Save images to the user's folder and collect their URLs
    const imageUrls = await saveImages(images, userFolder);
    console.log(imageUrls);
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
    res.status(500).json({
      status: "fail",
      payload: {
        error_message: err.message,
        error_code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};

// Function to save uploaded images to the user's folder
const saveImages = async (images, userFolder) => {
  const imageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageName = `image_${Date.now()}_${i}${path.extname(image.name)}`;
    const imagePath = path.join(userFolder, imageName);
    try {
      await fs.promises.writeFile(imagePath, image.data);
      imageUrls.push(`/uploads/${userFolder}/${imageName}`);
    } catch (error) {
      // Handle error while saving image
      throw new Error(`Failed to save image ${i}`);
    }
  }
  return imageUrls;
};

// Get all car models
export const getAllCarModels = async (req, res) => {
  try {
    const carModels = await CarModel.find();
    res.json(carModels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a car model by ID
export const deleteCarModel = async (req, res) => {
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
