import express from "express";
const router = express.Router();
import {
  createCarModel,
  getAllCarModels,
  deleteCarModel,
} from "../controllers/carCtrl.js";
import { authenticateUserLogin } from "../middlewares/authenticate.js";

// Routes for CRUD operations on car models
router
  .route("/")
  .post(authenticateUserLogin, createCarModel)
  .get(getAllCarModels);
router.route("/:id").delete(deleteCarModel);

export default router;
