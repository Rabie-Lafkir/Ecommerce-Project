const Category = require("../Models/Categories");
const Subcategory = require("../Models/Subcategories");

const createCategory = async (req, res) => {
  const { category_name } = req.body;
  const user = req.user;
  //verify the role
   if (!(user && (user.role === "admin" || user.role === "manager"))) {
     return res
       .status(403) 
       .json({ message: "Only admin and manager can create a category" });
   }
  if (!category_name) {
    return res
      .status(400)
      .json({ msg: "Please enter the name of the category" });
  }

  try {
    // verify the existence
    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory) {
      return res
        .status(400)
        .json({
          status: 400,
          message: `The category '${existingCategory.category_name}' already exists`,
        });
    }

    //create a new category
    const category = await Category.create({
      category_name,
      active: false,
    });
    res
      .status(201)
      .json({ status: 201, message: "category created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Search for categories

const searchForCategories = async (req, res) => {
  const { query } = req.query;
  console.log("Search Key:", query);
  try {
    const page = parseInt(req.query.page) || 1;
    const limitpage = 10;
    const categories = await Category.find({
      category_name: { $regex: query, $options: "i" },
    })
      .skip((page - 1) * limitpage)
      .limit(limitpage);

    //In case if no data
    if (categories.length === 0) {
      return res.status(200).json([]);
    }
    //format of the categories data list
    const formattedCategories = categories.map((category) => ({
      _id: category._id,
      categoryName: category.category_name,
      active: category.active,
    }));

    res.status(200).json({ status: 200, data: formattedCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//List all categories

const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limitpage = 10; 

  try {
    const categories = await Category.find()
      .skip((page - 1) * limitpage)
      .limit(limitpage); // a limit of 10 categories per page.

    //In case if no data
    if (categories.length === 0) {
      return res.status(200).json([]);
    }
    //format of the categories data list
    const formattedCategories = categories.map((category) => ({
      _id: category._id,
      categoryName: category.category_name,
      active: category.active,
    }));

    res.status(200).json({ status: 200, data: formattedCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get category by ID

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Category not found" });
    }

    // Format of the res
    const formattedCategory = {
      _id: category._id,
      categoryName: category.category_name,
      active: category.active,
    };

    res.status(200).json({ status: 200, data: formattedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update category by ID

const updateCategory = async (req, res) => {
  const user = req.user;

  //verify the role
  if (!(user && (user.role === "admin" || user.role === "manager"))) {
    return res
      .status(403)
      .json({ status: 403, message: "You don't have enough privilege" });
  }
  try {
    //no category found with the provided id
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid category ID" });
    }
    //category_name is unique
    const existingCategory = await Category.findOne({
      category_name: req.body.category_name,
      _id: { $ne: req.params.id },
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ status: 400, message: "Category name must be unique" });
    }
    //updatee
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    //console.log(req.body);
    updatedCategory.save();
    // console.log('Updated Category:', updatedCategory);

    res
      .status(200)
      .json({ status: 200, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
//@Desc Delete a category
//@route DELETE api/categories/:id

const deleteCategory = async (req, res) => {
  //verify the role
  const user = req.user;
  if (!(user && (user.role === "admin" || user.role === "manager"))) {
    return res
      .status(403)
      .json({ status: 403, message: "You don't have enough privilege" });
  }

  try {
    // deletion rule activated
    const hasSubcategories = await Subcategory.exists({category: req.params.id});
    if (hasSubcategories) {
      return res.status(400)
        .json({
          status: 400,
          message: "Subcategories attached, cannot delete this category",
        });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid category ID" });
    }
    
    res.status(200).json({ status: 200, message: "Category deleted successfully" });

  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getAllCategories,
  createCategory,
  searchForCategories,
};
