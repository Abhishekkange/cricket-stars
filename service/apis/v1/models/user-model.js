const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Store emails in lowercase
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    unique: true, // Ensure phone number is unique
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'], // E.164 phone number format
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot be longer than 50 characters'],
    trim: true,  // Trim leading/trailing spaces
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'], // Ensure secure password length
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Only these roles are allowed
    default: 'user', // Default role is user
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


// Create the Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
