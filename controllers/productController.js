const mongoose = require('mongoose'); // Thêm dòng import mongoose
const multer = require('multer');
const products = require('../models/productModel');
const categories = require('../models/categoryModel');
const sub_categories = require('../models/subCategoryModel');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const checkfile = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  return cb(null, true);
};

const upload = multer({ storage, fileFilter: checkfile });

// GET ALL
const getAllProducts = async (req, res) => {
  try {
    const arr = await products.find().populate({
      path: 'sub_category', // Sửa lại để populate đúng với trường sub_category
      populate: {
        path: 'category',
        model: 'categories',
        select: 'name'
      }
    });
    res.json(arr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const product = await products.findById(productId)
      .populate({
        path: 'sub_category',
        populate: {
          path: 'category',
          model: 'categories',
          select: 'name'
        }
      });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    res.json(product);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm: ", error);
    res.status(500).json({ message: error.message });
  }
};


// ADD
const addPro = [
  upload.array('images', 5),
  async (req, res) => {
    try {
      const body = req.body;
      body.images = req.files.map(file => file.originalname);

      // Kiểm tra sub_category có tồn tại không
      const sub = await sub_categories.findById(body.sub_category_id);
      if (!sub) throw new Error('Sub-category không tồn tại');

      body.sub_category = sub._id; // Lưu ObjectId của sub_category

      const newProduct = new products(body);
      const saved = await newProduct.save();
      res.json(saved);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// UPDATE
const editPro = [
  upload.array('images', 5),
  async (req, res) => {
    try {
      const body = req.body;
      if (req.files.length > 0) {
        body.images = req.files.map(file => file.originalname);
      }

      const sub = await sub_categories.findById(body.sub_category_id);
      if (!sub) throw new Error('Sub-category không tồn tại');

      body.sub_category = {
        _id: sub._id,
        name: sub.name,
        category: sub.category
      };

      const updated = await products.findByIdAndUpdate(req.params.id, body, { new: true });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// DELETE
const deletePro = async (req, res) => {
  try {
    const deleted = await products.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProducts, getProductById, addPro, editPro, deletePro };
