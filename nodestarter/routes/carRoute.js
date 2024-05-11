const router = require("express").Router();
const {
  createCarModel,
  getAllCarModels,
  deleteCarModel,
} = require("../controllers/carCtrl");
const { authenticateUserLogin } = require("../middlewares/authenticate");

// Routes for CRUD operations on car models
router
  .route("/")
  .post(authenticateUserLogin, createCarModel)
  .get(getAllCarModels);
router.route("/:id").delete(deleteCarModel);

module.exports = router;
