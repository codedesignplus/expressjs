const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error initializing database");
  }
};

module.exports = {
  connectDatabase,
};
