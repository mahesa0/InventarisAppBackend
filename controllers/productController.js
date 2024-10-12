import Product from "../models/productModel.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(201).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

// Post a new product
export const postProducts = async (req, res) => {
  const { productName, category, quantity, price, totalPrice, date } = req.body;
  const image = req.file ? req.file.path : null;

  if (!image) {
    return res.status(400).json({
      error: true,
      status: 400,
      message: "Gambar produk harus diunggah",
    });
  }

  const finalTotalPrice = totalPrice || price * quantity;

  try {
    const newProduct = new Product({
      productName,
      category,
      quantity,
      price,
      totalPrice: finalTotalPrice,
      date,
      image,
    });
    await newProduct.save();

    res.status(201).json({
      error: "false",
      status: "201",
      massage: "data berhasil di input",
      data: {
        productName,
        category,
        quantity,
        price,
        totalPrice: finalTotalPrice,
        date: new Date().toISOString().split("T")[0],
        image: image,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get a product by name
export const getProductsById = async (req, res) => {
  try {
    let product = await Product.findOne({
      productName: req.params.productName,
    });
    res.status(201).json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Product Not Found");
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, category, quantity, price, date, image } = req.body;

  try {
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    product.productName = productName || product.productName;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.date = date || product.date;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    await product.deleteOne();
    res.status(200).send("Product Successfully Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
