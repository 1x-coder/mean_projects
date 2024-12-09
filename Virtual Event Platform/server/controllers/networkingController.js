// controllers/networkingController.js
const axios = require('axios');
const { AI_SERVICE_API_KEY } = require('../config');
const User = require('../models/User');

const getNetworkingSuggestions = async (userId) => {
  try {
    // Fetch user profile data from your database
    const user = await User.findById(userId);

    // Use user data to make a request to the OpenAI GPT-3 API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `Generate networking suggestions for a user interested in ${user.interests.join(', ')}.`,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_SERVICE_API_KEY}`,
        },
      }
    );

    // Process OpenAI GPT-3 API response and return networking suggestions
    const suggestions = response.data.choices[0].text.trim();
    return suggestions;
  } catch (error) {
    // Handle errors
    console.error('Error in networkingController:', error.message);
    return [];
  }
};

module.exports = { getNetworkingSuggestions };
