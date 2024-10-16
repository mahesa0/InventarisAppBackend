import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

import userRoutes from "./routes/UserRoute.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
const PORT = 8080;
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     exposedHeaders: ["Content-Length", "X-Total-Count"],
//     maxAge: 3600,
//     optionsSuccessStatus: 200,
//   })
// );

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
