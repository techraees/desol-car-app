const router = require("express").Router();
const {
  createCarModel,
  getAllCarModels,
  deleteCarModel,
} = require("../controllers/carCtrl");

// Routes for CRUD operations on car models
router.route("/").post(createCarModel).get(getAllCarModels);
router.route("/:id").delete(deleteCarModel);

module.exports = router;
