require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  INSTANCE: process.env.INSTANCE,
  PUBLIC_API_KEY: process.env.PUBLIC_API_KEY,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

const requiredEnvVars = [
  'API_BASE_URL',
  'INSTANCE',
  'PUBLIC_API_KEY',
  'ADMIN_API_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !config[varName]);

if (missingVars.length > 0) {
  console.error(`[${new Date().toISOString()}] Missing required environment variables:`, missingVars);
  process.exit(1);
}

module.exports = config;