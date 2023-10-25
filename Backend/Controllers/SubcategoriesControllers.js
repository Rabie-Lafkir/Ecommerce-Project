const Subcategory = require("../Models/Subcategories");
const Category = require("../Models/Categories");
//const Product = require('../Models/Product');

// Creating a new subcategry
const createSubCategory = async (req, res) => {
  const { subcategory_name, category_id } = req.body;
  //console.log(req.body);
  const user = req.user;
  //verify the role
  if (!(user && (user.role === "admin" || user.role === "manager"))) {
      return res
       .status(403) 
        .json({ message: "Only admin and manager can create a subcategory" });
   }
  //not empty
  if (!subcategory_name || !category_id) {
    return res
      .status(400)
      .json({ msg: "Please enter the name of the subcategory" });
  }

  try {
    const category = await Category.findById(category_id);
    if (!category) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid category ID" });
    }
    // verify the existence
    const existingSubcategory = await Subcategory.findOne({ subcategory_name });
    //console.log(existingSubcategory);
    if (existingSubcategory) {
      return res.status(400).json({
        status: 400,
        message: `The subcategory '${existingSubcategory.subcategory_name}' already exists`,
      });
    }

    //create a new subcategory
    const subcategory = await Subcategory.create({
      subcategory_name,
      category_id,
    });
  
    res
      .status(201)
      .json({ status: 201, message: "subcategory created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listing all the categories
const getSubcategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const subcategories = await Subcategory.aggregate([
      { $skip: (page - 1) * limit },

      { $limit: limit },

      {
        $lookup: {
          from: "categories", // Name of the category
          localField: "category_id", // Field in Subcategory model
          foreignField: "_id", // Field in Category model
          as: "category", //the name of the new field that will contain the matching docs from categorie
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 1,
          subcategoryName: "$subcategory_name",
          categoryID: "$category._id", // Rename oldField to newField in the output
          categoryName: "$category.category_name",
          active: 1,
        },
      },
    ]);

    // If no subcategories exist
    if (subcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // S
    res.status(200).json({ status: 200, data: subcategories });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
//$lookup: to join the subcateg coll with the categ coll based on the category_id
//$unwind to destruct the category array created by the $lookup stage
//$project to reshape the output doc and include the required fiels

// //Searching for subcategories
const searchSubcategory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const searchQuery = req.query.searchQuery;

  try {
    const subcategories = await Subcategory.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
           subcategory_name: { $regex: searchQuery, $options: "i" } 
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          subcategoryName: "$subcategory_name",
          categoryID: "$category._id",
          categoryName: "$category.category_name",
          active: 1,
        },
      },
    ]);

    if (subcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    res.status(200).json({ status: 200, data: subcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: error.message });
  }
};
// //Getting a subcategory by ID

const getSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate({  // recup data
      path: 'category_id',
      select: 'category_name'
    });
    if (!subcategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Subcategory not found" });
    }
    const formattedSubcategory = {
      _id: subcategory._id,
      subcategoryName: subcategory.subcategory_name,
      categoryID: subcategory.category_id._id,
      categoryName: subcategory.category_id.category_name,
      active: subcategory.active,
    };
    res.status(200).json({ status: 200, data: [formattedSubcategory] });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

//Updating the subcategory data

const updateSubcategory = async (req, res) => {
  const user = req.user; 
  const { subcategory_name, category_id, active} = req.body;

  // Verify role
  if (!(user && (user.role === "admin" || user.role === "manager"))) {
    return res
      .status(403)
      .json({ status: 403, message: "You don't have enough privilege" });
  }

  try {
    const subcategory = await Subcategory.findById(req.params.id);
      if(!subcategory){
        res.status(404).json({
          status: 404,
          message: 'invalid subcategory id'})
      }

    // Check if the subcategory exists
    const existingSubcategory = await Subcategory.findById(req.params.id);
    if (!existingSubcategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid subcategory ID" });
    }

    if (existingSubcategory && existingSubcategory._id.toString() !== subcategory._id.toString()) {
      return res.status(400).json({
        status: 400,
        message: "category name already exists",
      });
    }

    // Update subcategory data
    existingSubcategory.subcategory_name = subcategory_name;
    existingSubcategory.category_id = category_id;
    existingSubcategory.active = active;
    await existingSubcategory.save();

   
    return res
      .status(200)
      .json({ status: 200, message: "Subcategory updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

//Deleting a subcategory

const deleteSubcategory = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  // Verify role
  if (!(user && (user.role === "admin" || user.role === "manager"))) {
   return res
     .status(403)
      .json({ status: 403, message: "You don't have enough privilege" });
  }

  try {
    // Check if the subcategory exists
    const existingSubcategory = await Subcategory.findById(id);
    if (!existingSubcategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid subcategory ID" });
    }

    // subcategory with products
    
    // const attachedProductsCount = await Product.countDocuments({
    //   subcategory_id: id,
    // });
    // if (attachedProductsCount > 0) {
    //   return res
    //     .status(400)
    //     .json({
    //       status: 400,
    //       message: "Subcategory has attached products and cannot be deleted",
    //     });
    // }

    // Delete subcategory
    await Subcategory.findByIdAndDelete(req.params.id);
    // success
    return res
      .status(200)
      .json({ status: 200, message: "Subcategory deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

module.exports = {
  createSubCategory,
  getSubcategories,
  searchSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
