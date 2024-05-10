const router = require("express").Router();
const {
  verifyUserLogin,
  loginUser,
  createrNewUser,
} = require("../controllers/authCtrl");

router.route("/verify/:token").get(verifyUserLogin);
router.route("/login").post(loginUser);
router.route("/register").post(createrNewUser);

module.exports = router;
