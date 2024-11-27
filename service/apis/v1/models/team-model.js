const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Team Schema
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,  // The name of the team is required
    trim: true,      // Remove any leading or trailing whitespace
  },
  image: {
    type: String,
    required: true,  // The image URL or file path is required
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create the Mongoose model based on the schema
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
