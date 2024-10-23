import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/UserRoute.js";
import productRoutes from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
const PORT = 8080;
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
