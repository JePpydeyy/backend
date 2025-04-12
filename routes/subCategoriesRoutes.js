const express = require('express');
const router = express.Router();

const subCategoryController = require('../controllers/subCategoryController');

// GET: Lấy tất cả sub_categories
router.get('/', subCategoryController.getAllSubCategories);

// GET: Lấy 1 sub_category theo ID
router.get('/:id', subCategoryController.getSubCategoryById);

// GET: Lấy các sub_category theo category cha
router.get('/by-category/:categoryId', subCategoryController.getSubCategoriesByCategory);

// POST: Thêm mới sub_category
router.post('/', subCategoryController.addSubCategory);

// PUT: Cập nhật sub_category theo ID
router.put('/:id', subCategoryController.updateSubCategory);

// DELETE: Xóa sub_category theo ID
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;
