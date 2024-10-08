import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    id_category: {
      type: String,
      required: true,
      unique: true,
    },
    name_category: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
