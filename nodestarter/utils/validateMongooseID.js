const mongoose = require("mongoose");

const isValidObjectId = async (id) => {
  try {
    return await mongoose.isValidObjectId(id);
  } catch (error) {
    return false;
  }
};

module.exports = isValidObjectId;
