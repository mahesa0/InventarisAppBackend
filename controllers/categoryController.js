import Category from "../models/categoryModel.js";

export const getCategory = async (req, res) => {
  try {
    let category = await Category.find();
    res.status(201).json({ category });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

export const postCategory = async (req, res) => {
  const { id_category, name_category } = req.body;

  try {
    const existingCategory = await Category.findOne({
      $or: [{ id_category }, { name_category }]
    });

    if (existingCategory) {
      return res.status(400).json({ msg: 'Category with this ID or name already exists' });
    }

    const newCategory = new Category({
      id_category,
      name_category,
    });

    const saveCategory = await newCategory.save();
    res.status(201).json({ saveCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


export const getProductByCategory = async (req, res) => {
  const { id } = req.params;
  const field = {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    list_product: { createdAt: 0, updatedAt: 0, __v: 0 },
  };
  try {
    let category = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "id_category",
          foreignField: "id_category",
          as: "list_product",
        },
      },
      {
        $match: {
          id_category: id,
        },
      },
    ]).project(field);
    res.status(201).json({ category });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};
