import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/UserRoute.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

// const corsConfig = {
//   origin: "*",
//   credential: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };

const app = express();
const PORT = 8080;

// app.options("", cors(corsConfig));
app.use(bodyParser.json());
app.use(cors());

// Test Build
app.get("/", (req, res) => {
  res.send("Welcome To App!");
});

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
