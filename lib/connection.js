import mongoose from "mongoose";

const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB_NAME,
    });
  } catch (e) {
    console.log("Database Connection Error: ", e.message);
  }
};

export default connection;
