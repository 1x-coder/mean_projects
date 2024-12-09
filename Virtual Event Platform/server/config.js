// server/config.js
require('dotenv').config(); // Load environment variables from .env

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET ,
  AI_SERVICE_API_KEY: process.env.AI_SERVICE_API_KEY ,
  // Add other configuration variables as needed
};
