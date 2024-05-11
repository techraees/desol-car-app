import isValidObjectId from "../utils/validateMongooseID.js";
import UserModal from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Login User By Token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        payload: { error_message: "User Not Found", error_code: 400 },
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({
        status: "fail",
        payload: { error_message: "Password is wrong", error_code: 401 },
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ status: "success", payload: { access_token: token } });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      payload: {
        error_code: error.message,
        error_message: "Internal Server Error",
      },
    });
  }
};
// Verify User By Token
const verifyUserLogin = async (req, res) => {
  try {
    const { token } = req.params;
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const { id } = decoded;
    const user = await UserModal.findById(id);

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    return res.status(200).json({ status: "success", payload: { user } });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      payload: {
        error_code: error.message,
        error_message: "Internal Server Error",
      },
    });
  }
};

// Create New User By Email Password
const createrNewUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyUser = await UserModal.findOne({ email });
    if (alreadyUser) {
      return res.status(404).json({
        status: "fail",
        payload: { error_message: "User Already Registered ", error_code: 404 },
      });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserModal.create({ email, password: hashPassword });

    return res.status(200).json({ status: "success", payload: { user: user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      payload: {
        error_code: error.message,
        error_message: "Internal Server Error",
      },
    });
  }
};

export { verifyUserLogin, loginUser, createrNewUser };
