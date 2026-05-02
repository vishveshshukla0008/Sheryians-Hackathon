import mongoose from "mongoose";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const maxRetries = 5;
  const retryDelay = 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}/${maxRetries}):`, err.message);

      if (attempt === maxRetries) {
        console.error("MongoDB connection failed permanently. Exiting...");
        process.exit(1);
      }

      await wait(retryDelay);
    }
  }
};

export default connectDB;
