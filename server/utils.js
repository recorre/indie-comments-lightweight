const axios = require('axios');
const config = require('./config');

/**
 * Generic API request function.
 * @param {string} method - HTTP method (get, post, put, delete).
 * @param {string} endpoint - API endpoint (e.g., '/read/comments').
 * @param {object} data - Request body data for POST/PUT.
 * @param {object} params - Query parameters.
 * @param {string} apiKey - The API key to use (PUBLIC_API_KEY or ADMIN_API_KEY).
 * @returns {Promise<object>} - The response data.
 */
async function makeApiRequest(method, endpoint, data = {}, params = {}, apiKey) {
  const url = `${config.API_BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: method !== 'get' ? data : undefined,
      params: { ...params, Instance: config.INSTANCE }
    });
    return response.data;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] API Request Error (${method.toUpperCase()} ${endpoint}):`);
    console.error(`[${new Date().toISOString()}] Request URL: ${url}`);
    console.error(`[${new Date().toISOString()}] Request Params:`, { ...params, Instance: config.INSTANCE });
    if (method !== 'get') console.error(`[${new Date().toISOString()}] Request Data:`, data);
    console.error(`[${new Date().toISOString()}] Request Headers:`, headers);
    console.error(`[${new Date().toISOString()}] Error Status: ${error.response?.status || 'Unknown'}`);
    console.error(`[${new Date().toISOString()}] Error Data:`, error.response?.data);
    console.error(`[${new Date().toISOString()}] Error Message: ${error.message}`);
    if (error.response?.headers) console.error(`[${new Date().toISOString()}] Error Headers:`, error.response.headers);
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Failed to communicate with external API',
      originalError: error
    };
  }
}

module.exports = { makeApiRequest };