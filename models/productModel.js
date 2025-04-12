const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // ID tùy chỉnh, kiểu String
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  sub_category: { type: String, required: true }, 
  description: { type: String },
  ingredients: [{ type: String }],
  usage_instructions: [{ type: String }],
  special: [{ type: String }]
}, { versionKey: false });


const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
