// Import required modules
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import DB from "./utils/db.js";


// Create an Express application
const app = express();

// Connected to Database
DB();

// Middleware for parsing request bodies (optional)
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Apply cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);


// Routes
import authRoute from "./routes/authRoute.js"
import cityRoute from "./routes/cityRoute.js"
import carRoute from "./routes/carRoute.js"

app.use("/api/auth", authRoute);
app.use("/api/city", cityRoute);
app.use("/api/car", carRoute);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
