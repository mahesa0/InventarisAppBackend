import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://axearmy194:qUh0bMON24ewnN3T@myproject.ms3ju.mongodb.net/?retryWrites=true&w=majority&appName=MyProject";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || dev_db_url);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
