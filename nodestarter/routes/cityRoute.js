import express from "express";
const router = express.Router();
import {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} from "../controllers/cityCtrl.js";
import {
  authenticateUserLogin,
  checkAuthorization,
} from "../middlewares/authenticate.js";

// Routes for CRUD operations on cities
router.route("/").post(createCity).get(getAllCities);
router.route("/:id").get(getCityById).put(updateCity).delete(deleteCity);

export default router;
