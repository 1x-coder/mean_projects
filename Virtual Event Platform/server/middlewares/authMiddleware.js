// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return reject(err);
      }

      // Verify that the user exists
      const user = await User.findById(decoded.userId);

      if (!user) {
        return reject(new Error('User not found'));
      }

      resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyToken };
