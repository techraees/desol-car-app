import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const authenticateUserLogin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      status: "fail",
      payload: {
        error_message: "Unauthorized: Token not provided",
        error_code: "UNAUTHORIZED",
      },
    });
  }

  let decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(403).json({
      status: "fail",
      payload: {
        error_message: "Unauthorized: Insufficient privileges",
        error_code: "FORBIDDEN",
      },
    });
  }

  const { id } = decoded;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(403).json({
      status: "fail",
      payload: {
        error_message: "Unauthorized: Invalid token",
        error_code: "FORBIDDEN",
      },
    });
  }
  req.user = user;
  next();
};

function checkAuthorization(req, res, next) {
  const { role } = req.user;

  if (role === "admin") {
    next();
  } else {
    return res.status(403).json({
      status: "fail",
      payload: {
        error_code: 403,
        error_message: "Unauthorized: Insufficient privileges",
      },
    });
  }
}

export { authenticateUserLogin, checkAuthorization };
