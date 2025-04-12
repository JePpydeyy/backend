const SubCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');

// Lấy tất cả sub_categories
const getAllSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find().populate('category', 'name');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy sub_category theo ID
const getSubCategoryById = async (req, res) => {
  try {
    const data = await SubCategory.findById(req.params.id).populate('category', 'name');
    if (!data) return res.status(404).json({ message: 'Không tìm thấy sub category' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy sub_categories theo category cha
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const data = await SubCategory.find({ category: categoryId }).populate('category', 'name');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới sub_category
const addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // Kiểm tra category có tồn tại không
    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
      return res.status(400).json({ message: 'Danh mục cha không tồn tại' });
    }

    const newSub = new SubCategory({ name, category });
    const savedSub = await newSub.save();
    res.json(savedSub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sub_category
const updateSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const checkCategory = await Category.findById(category);
    if (!checkCategory) {
      return res.status(400).json({ message: 'Danh mục cha không tồn tại' });
    }

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sub category' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa sub_category
const deleteSubCategory = async (req, res) => {
  try {
    const deleted = await SubCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sub category' });
    res.json({ message: 'Đã xóa thành công', deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
};
