const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'categories', required: true }
}, { versionKey: false });

const SubCategory = mongoose.model('sub_categories', subCategorySchema);
module.exports = SubCategory;
