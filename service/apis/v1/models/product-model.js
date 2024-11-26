const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product Schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,  // Trimming any leading/trailing spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0,  // Ensure the price is positive
  },
  height: {
    type: String,  // Store as string to accommodate format like '7/3 inch'
    required: true,
  },
  availableStock: {
    type: Number,
    required: true,
    min: 0,  // Stock cannot be negative
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Team collection
    ref: 'Team',  // 'Team' model name
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,  // URL or file path for the image
    required: true,
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Create the Mongoose model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
