import CarModel from "../models/carModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createSlug from "../helper/CreateSlug.js";

export const createCarModel = async (req, res) => {
  try {
    const { car_model, price, phone, city, no_of_copies } = req.body;
    const images = req.files;
    const { email } = req.user;

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

    // const userFolder = path.join(__dirname, "../public/uploads-car-image", email);
    const slugname = createSlug(car_model);

    const userFolder = path.join(
      __dirname,
      "../public/uploads-car-images",

      `${slugname}-${email}`
    );
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    // Save images to the user's folder and collect their URLs
    const imageUrls = await saveImages(
      images,
      userFolder,
      `${slugname}-${email}`
    );
    console.log(imageUrls);
    // Create a new car model with image URLs
    const newCarModel = await CarModel.create({
      car_model,
      price,
      phone,
      city,
      userId: req.user._id,
      no_of_copies,
      images_array: imageUrls,
    });

    return res
      .status(201)
      .json({ status: "success", payload: { newCarModel } });
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
const saveImages = async (imagesObj, userFolder, folderName) => {
  const imageUrls = [];

  // Iterate over the keys of imagesObj
  for (const key in imagesObj) {
    const image = imagesObj[key];

    // Generate a unique name for the image
    const imageName = `image_${Date.now()}_${key}${path.extname(image.name)}`;
    // Construct the image path
    const imagePath = path.join(userFolder, imageName);

    try {
      // Write the image data to the file system
      await fs.promises.writeFile(imagePath, image.data);
      // Push the image URL to the array
      imageUrls.push(`/uploads-car-images/${folderName}/${imageName}`);
    } catch (error) {
      // Handle error while saving image
      throw new Error(`Failed to save image ${key}`);
    }
  }

  return imageUrls;
};

// Get all car models
export const getAllCarModels = async (req, res) => {
  try {
    const carModels = await CarModel.find().populate("city");
    res.json({ status: "success", payload: { carModels } });
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

// Get a Car by ID
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await CarModel.findById(id);
    if (!car) {
      return res.status(404).json({
        status: "fail",
        payload: { error_message: "Car not found", error_code: "NOT_FOUND" },
      });
    }
    res.json({ status: "success", payload: { car } });
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
