import multer from "multer";
import path from "path";

// Define the destination folder within the server directory
const destinationFolder = "uploads"; // Folder name where images will be stored

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationFolder); // Destination folder where images will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

// Multer upload instance
const upload = multer({ storage });
