// Import required modules
const express = require("express");
const fileUpload = require("express-fileupload");
const DB = require("./utils/db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Create an Express application
const app = express();

// Middleware for parsing request bodies (optional)
app.use(express.static("public"));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connected to Database
DB();

// Apply cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);

// Static assets
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoute = require("./routes/authRoute");
const cityRoute = require("./routes/cityRoute");
const carRoute = require("./routes/carRoute");

app.use("/api/auth", authRoute);
app.use("/api/city", cityRoute);
app.use("/api/car", carRoute);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
