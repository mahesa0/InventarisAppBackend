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
  const { id } = req.params; // Mengambil ID dari parameter URL
  const { productName, category, quantity, price, totalPrice, date } = req.body;
  const image = req.file ? req.file.path : null; // Mengambil gambar baru jika ada

  // Hitung totalPrice jika tidak disediakan
  const finalTotalPrice = totalPrice || price * quantity;

  try {
    // Cari produk berdasarkan ID
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: "Produk tidak ditemukan",
      });
    }

    // Perbarui data produk jika disediakan dalam request body
    if (productName) product.productName = productName;
    if (category) product.category = category;
    if (quantity) product.quantity = quantity;
    if (price) product.price = price;
    if (finalTotalPrice) product.totalPrice = finalTotalPrice;
    if (date) product.date = date;
    if (image) product.image = image; // Update gambar jika ada gambar baru yang diunggah

    // Simpan perubahan
    await product.save();

    // Kembalikan response sukses
    res.status(200).json({
      error: false,
      status: 200,
      message: "Produk berhasil diperbarui",
      data: {
        id: product._id,
        productName: product.productName,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        totalPrice: product.totalPrice,
        date: new Date(product.date).toISOString().split("T")[0], // Format tanggal
        image: product.image,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: true,
      status: 500,
      message: "Server Error",
    });
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
