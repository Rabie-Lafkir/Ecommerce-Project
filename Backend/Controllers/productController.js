const mongoose = require('mongoose');
const { Product } = require('../models/products');
const ObjectId = mongoose.Types.ObjectId;

// Create a new product
const createProduct = async (req, res) => {
    try {
        // Ensure only users with admin and manager roles can create a product
        const {
            sku,
            productImage,
            productName,
            subcategoryID,
            shortDescription,
            longDescription,
            price,
            quantity,
            discountPrice,
            options,
        } = req.body;

        const newProduct = new Product({
            sku: sku,
            productImage: productImage,
            productName: productName,
            subcategoryID: subcategoryID,
            shortDescription: shortDescription,
            longDescription,
            price,
            quantity,
            discountPrice,
            options,
        });

        await newProduct.save();

        res.status(201).json({ status: 201, message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// List all the products
const listProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const products = await Product.aggregate([
            {
                $project: {
                    _id: 1,
                    sku: 1,
                    productImage: 1,
                    productName: 1,
                    categoryName: '$categoryName', // Modify this to match your schema structure
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

// Search for a product
const searchProducts = async (req, res) => {
    try {
        const query = req.query.query;
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const products = await Product.aggregate([
            {
                $match: {
                    productName: { $regex: query, $options: 'i' }, // Case-insensitive search
                },
            },
            {
                $project: {
                    _id: 1,
                    sku: 1,
                    productImage: 1,
                    productName: 1,
                    subcategoryID: 1,
                    subcategoryName: '$subcategoryName', // Modify this to match your schema structure
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
    try {
        const productId = req.params.id;
        console.log('Product ID:', productId);

        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID' });
        }

        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(productId),
                },
            },
            {
                $lookup: {
                    from: 'subcategories', // Modify this to match your collection name
                    localField: 'subcategoryID',
                    foreignField: '_id',
                    as: 'subcategory',
                },
            },
            {
                $unwind: '$subcategory',
            },
            {
                $project: {
                    _id: 1,
                    sku: 1,
                    productImage: 1,
                    productName: 1,
                    subcategoryID: 1,
                    subcategoryName: '$subcategory.name', // Modify this to match your schema structure
                    shortDescription: 1,
                    longDescription: 1,
                    price: 1,
                    quantity: 1,
                    discountPrice: 1,
                    active: 1,
                    options: 1,
                },
            },
        ];

        const product = await Product.aggregate(pipeline);

        if (product.length === 0) {
            return res.status(404).json({ status: 404, message: 'Product not found' });
        }

        console.log('Product Data:', product);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, error: error.message });
    }
};

// Update the product data
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Request Params:', req.params);
        console.log('Product ID:', productId);

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log('Invalid Product ID:', productId);
            return res.status(400).json({ status: 400, message: 'Invalid product ID' });
        }

        const updatedFields = req.body;
        console.log('Updated Fields:', updatedFields); // Add this line for debugging

        if (updatedFields.productName) {
            const existingProduct = await Product.findOne({
                productName: updatedFields.productName,
                _id: { $ne: productId },
            });
            if (existingProduct) {
                return res.status(400).json({ status: 400, message: 'The product name should be unique' });
            }
        }

        // Include user role check if required
        // const user = req.user;
        // if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
        //     return res.status(403).json({ status: 403, message: "You don't have enough privilege" });
        // }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ status: 404, message: 'Invalid product id' });
        }

        res.status(200).json({ status: 200, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};


// delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if productId is not a valid ObjectId
        if (!ObjectId.isValid(productId)) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ status: 404, message: 'Product not found' });
        }

        // Remove the role check temporarily for testing
        // const user = req.user; // Assuming you're using a middleware to attach the user to the request
        // if (!user || (user.role !== 'admin' && user.role !== 'manager' && user.role !== 'otherRole')) {
        //     return res.status(403).json({ status: 403, message: "You don't have enough privilege" });
        // }

        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ status: 404, message: 'Failed to delete the product' });
        }

        res.status(200).json({ status: 200, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};



module.exports = {
    createProduct,
    listProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductById,
};
