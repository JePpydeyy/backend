const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// Các route để lấy sản phẩm
router.get('/', productCtrl.getAllProducts);  // Route lấy tất cả sản phẩm
router.get('/:id', productCtrl.getProductById);  // Route lấy sản phẩm theo ID

// Các route để thêm, sửa, xóa sản phẩm
router.post('/', productCtrl.addPro);
router.put('/:id', productCtrl.editPro);
router.delete('/:id', productCtrl.deletePro);

module.exports = router;
