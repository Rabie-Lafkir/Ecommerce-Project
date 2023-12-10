const mongoose = require("mongoose");
const { Product } = require("../Models/product");
const { Categories } = require("../Models/categorie");
const ObjectId = mongoose.Types.ObjectId;

// Create a new product
const createProduct = async (req, res) => {
  try {
   
    const {
      sku,
  
      product_name,
      categoryLink,
      short_description,
      long_description,
      price,
      quantity,
      discount_price,
      options,
    } = req.body;

    console.log(req.body)
    const product_image = req.file ? req.file.path : null;



    const newProduct = new Product({
      sku,
      product_image,
      product_name,
      categoryLink,
      short_description,
      long_description,
      price,
      quantity,
      discount_price: discount_price,
      options,
    });

    const prod = await newProduct.save();
    console.log(prod)

    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//get all product
const listProducts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 70;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate('categoryLink'); 

    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Search for a product
const searchProducts = async (req, res) => {
  try {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = 1;

    const products = await Product.aggregate([
      {
        $match: {
          productName: { $regex: query, $options: "i" }, // Case-insensitive search
        },
      },
      {
        $project: {
          _id: 1,
          sku: 1,
          productImage: 1,
          productName: 1,
          categoryLink: 1,
          category_name: "$category_name", // Modify this to match your schema structure
          shortDescription: 1,
          price: 1,
          quantity: 1,
          discountPrice: 1,
          active: 1,
        },
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: perPage,
      },
    ]);

    res.status(200).json({ status: 200, data: products });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const id=req.params.id;

  console.log("Received Product ID:", id); 

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ status: 400, message: 'Invalid product ID' });
    }

    const product = await Product.find({_id:id})
    .populate({
      path: 'categoryLink',
      select: 'category_name', 
    });; 

    if (!product || product.length === 0) {
      return res.status(404).json({ status: 404, message: 'Product not found' });
    }

    res.status(200).json({ status: 200, data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: `Error retrieving product with id: ${id}`,
      error: error.message,
    });
  }
};





// Update the product data
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ status: 400, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    let updatedFields = req.body;
    const product_image = req.file ? req.file.path : null;

    if (product_image) {
      // Mettre à jour le champ product_image uniquement s'il y a une nouvelle image
      updatedFields = { ...updatedFields, product_image };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ status: 404, message: "Product update failed" });
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

   
    if (!ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: "Failed to delete the product" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    res.status(200).json( totalProducts );
  } catch (error) {
    console.error('Error getting total products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
  getTotalProducts,
};
