const router = require("express").Router();
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/cityCtrl");
const {
  authenticateUserLogin,
  checkAuthorization,
} = require("../middlewares/authenticate");

// Routes for CRUD operations on cities
router
  .route("/")
  .post(authenticateUserLogin, checkAuthorization, createCity)
  .get(getAllCities);
router.route("/:id").get(getCityById).put(updateCity).delete(deleteCity);

module.exports = router;
