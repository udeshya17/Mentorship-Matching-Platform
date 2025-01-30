const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['mentor', 'mentee'], 
  },
  skills: {
    type: [String], 
    required: true,
  },
  interests: {
    type: [String], 
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
