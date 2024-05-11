import mongoose from "mongoose";

const isValidObjectId = async (id) => {
  try {
    return await mongoose.isValidObjectId(id);
  } catch (error) {
    return false;
  }
};

export default isValidObjectId;
