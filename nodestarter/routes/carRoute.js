import express from "express";
const router = express.Router();
import {
  createCarModel,
  getAllCarModels,
  deleteCarModel,
  getCarById,
} from "../controllers/carCtrl.js";
import { authenticateUserLogin, checkAuthorization } from "../middlewares/authenticate.js";

// Routes for CRUD operations on car models
router
  .route("/")
  .post(authenticateUserLogin, checkAuthorization, createCarModel)
  .get(getAllCarModels);
router.route("/:id").delete(deleteCarModel).get(getCarById);

export default router;
