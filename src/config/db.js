/*const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("Error connecting to db");
      process.exit(1);
    });
}

module.exports = connectToDB;*/

// this is showing error thatswhy commenting this and adding new code

const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Database is connected");
    })
    .catch((err) => {
      console.error("❌ Error connecting to DB:", err.message);
      process.exit(1);
    });
}

module.exports = connectToDB;
