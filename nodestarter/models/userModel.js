import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },

  { timestamps: true }
);

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

export default User;
