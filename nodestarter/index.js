// Import required modules
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import DB from "./utils/db.js";

// Create an Express application
const app = express();

app.use(express.static("./public"));

// Apply cors
let FRONTEND_URL = "http://localhost:3000";
let FRONTEND_URL_PRODUCTION = "https://desol-car-app-chi.vercel.app";
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);

// Connected to Database
DB();

// Middleware for parsing request bodies (optional)

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import authRoute from "./routes/authRoute.js";
import cityRoute from "./routes/cityRoute.js";
import carRoute from "./routes/carRoute.js";

app.use("/api/auth", authRoute);
app.use("/api/city", cityRoute);
app.use("/api/car", carRoute);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
