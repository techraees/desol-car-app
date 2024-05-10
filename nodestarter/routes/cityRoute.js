const router = require("express").Router();
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../controllers/cityCtrl");

// Routes for CRUD operations on cities
router.route("/").post(createCity).get(getAllCities);
router.route("/:id").get(getCityById).put(updateCity).delete(deleteCity);

module.exports = router;
