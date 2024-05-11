import express from "express";
const router = express.Router();
import {
  verifyUserLogin,
  loginUser,
  createrNewUser,
} from "../controllers/authCtrl.js";

router.route("/verify/:token").get(verifyUserLogin);
router.route("/login").post(loginUser);
router.route("/register").post(createrNewUser);

export default router;
