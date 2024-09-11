import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from.env file
dotenv.config({
  path: "./.env",
});

const mongoDbUri = process.env.MONGOURI;

if (!mongoDbUri) {
  console.log("Please provide a MongoDB URI");
  process.exit(1);
}

// Connect to MongoDB
const connectToDB = () => {
  mongoose
    .connect(mongoDbUri)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};

export default connectToDB;
