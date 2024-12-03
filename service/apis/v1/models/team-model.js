const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
    unique: true
  },
  teamName: {
    type: String,
    required: true,
    unique: true
  },
  teamImage: {
    type: String,
    required: true
  },
  teamDescription: {
    type: String,
    required: true
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;