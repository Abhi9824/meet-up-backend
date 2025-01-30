const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Connected Successfully");
    }
  } catch (error) {
    console.log("Connection lost", error);
  }
};

module.exports = { initializeDatabase };
