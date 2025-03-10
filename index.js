import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import stripeRouter from "./routes/checkout-routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to remote MongoDB database");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Call connectDB to establish the connection
connectDB();

app.use("/api/v1/checkout", stripeRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
