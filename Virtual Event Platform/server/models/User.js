// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: [{ type: String }],  // Add this line for interests
  skills: [{ type: String }],     // Add this line for skills
  // Add additional fields as needed for your application
});

const User = mongoose.model('User', userSchema);

module.exports = User;
