const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { body, param, query, validationResult } = require('express-validator');
const config = require('./config');
const { makeApiRequest } = require('./utils');
const crypto = require('crypto');
const i18n = require('./i18n');

const app = express();
const PORT = config.PORT;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:8003', // For local widget development
      'http://127.0.0.1:8003', // For local widget development
      config.FRONTEND_URL, // Configured frontend URL
    ].filter(Boolean);

    // Allow requests with no origin (like mobile apps or curl requests)
    // and from the defined allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Configuration
const { API_BASE_URL, INSTANCE, PUBLIC_API_KEY, ADMIN_API_KEY } = config;

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: i18n.validationFailed,
      errors: errors.array()
    });
  }
  next();
};

// Centralized error handling for API requests
const apiErrorHandler = (err, res, defaultMessage) => {
  console.error(`[${new Date().toISOString()}] API Request Error:`, err.originalError || err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || defaultMessage
  });
};

// Health check endpoint
/**
 * @route GET /health
 * @desc Health check endpoint
 * @access Public
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * @route GET /api/comments
 * @desc Fetches comments for a given thread.
 * @access Public
 * @queryparam {number} thread_id - The ID of the thread.
 * @queryparam {string} [status='approved'] - The status of comments to fetch (approved, pending).
 */
app.get('/api/comments', [
  query('thread_id').isInt().withMessage('thread_id must be an integer'),
  query('status').optional().isIn(['approved', 'pending']).withMessage('status must be approved or pending'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { thread_id, status = 'approved' } = req.query;
    const response = await makeApiRequest('get', '/read/comments', {}, { thread_id, status }, PUBLIC_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to fetch comments');
  }
});

/**
 * @route GET /api/threads
 * @desc Fetches all threads for a given site.
 * @access Public
 * @queryparam {number} site_id - The ID of the site.
 */
app.get('/api/threads', [
  query('site_id').isInt().withMessage('site_id must be an integer'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { site_id } = req.query;
    const response = await makeApiRequest('get', '/read/threads', {}, { Instance: INSTANCE, site_id }, PUBLIC_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to fetch threads');
  }
});

/**
 * @route POST /api/comments
 * @desc Creates a new comment.
 * @access Public
 * @bodyparam {number} thread_id - The ID of the thread the comment belongs to.
 * @bodyparam {string} author_name - The name of the comment author.
 * @bodyparam {string} message - The content of the comment.
 * @bodyparam {string} [author_email] - The email of the author.
 * @bodyparam {string} [author_website] - The website of the author.
 * @bodyparam {number} [parent_id] - The ID of the parent comment, if it's a reply.
 */
app.post('/api/comments', [
  body('thread_id').isInt().withMessage('thread_id must be an integer'),
  body('author_name').isString().isLength({ min: 1, max: 100 }).matches(/^[a-zA-Z0-9\s]+$/).withMessage('author_name must contain only letters, numbers, and spaces'),
  body('message').isString().isLength({ min: 1, max: 10000 }).matches(/^[a-zA-Z0-9\s\.,!?@#\$%\^&\*\(\)\-_=\+\[\]\{\}\|;:'"<>\?/\\]+$/).withMessage('message contains invalid characters'),
  body('author_email').optional().isEmail().withMessage('author_email must be a valid email'),
  body('author_website').optional().isURL().withMessage('author_website must be a valid URL'),
  body('parent_id').optional().isInt().withMessage('parent_id must be an integer'),
  handleValidationErrors
], async (req, res) => {
  try {
    const allowedFields = ['thread_id', 'author_name', 'message', 'author_email', 'author_website', 'parent_id'];
    const filteredBody = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    const { thread_id, author_name, message, author_email, author_website, parent_id } = filteredBody;
    const commentData = {
      thread_id: parseInt(thread_id),
      parent_id: parent_id || 0,
      author_name,
      author_email: author_email || null,
      author_website: author_website || null,
      author_ip: req.ip || req.connection.remoteAddress || '127.0.0.1',
      author_user_agent: req.get('User-Agent') || '',
      message,
      message_html: message,
      status: 'pending',
      spam_score: 0,
      moderated_by: 0,
      is_edited: 0,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString()
    };
    const response = await makeApiRequest('post', '/create/comments', commentData, {}, PUBLIC_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to create comment');
  }
});

/**
 * @route POST /api/threads
 * @desc Creates a new thread.
 * @access Public
 * @bodyparam {number} site_id - The ID of the site the thread belongs to.
 * @bodyparam {string} page_url - The URL of the page the thread is associated with.
 * @bodyparam {string} [page_title] - The title of the page.
 */
app.post('/api/threads', [
  body('site_id').isInt().withMessage('site_id must be an integer'),
  body('page_url').isString().isLength({ min: 1 }).withMessage('page_url is required'),
  body('page_title').optional().isString().withMessage('page_title must be a string'),
  handleValidationErrors
], async (req, res) => {
  try {
    const allowedFields = ['site_id', 'page_url', 'page_title'];
    const filteredBody = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    const { site_id, page_url, page_title } = filteredBody;
    const threadData = {
      site_id: parseInt(site_id),
      page_url,
      page_identifier: page_url,
      page_title: page_title || page_url,
      comment_count: 0
    };
    const response = await makeApiRequest('post', '/create/threads', threadData, {}, PUBLIC_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to create thread');
  }
});

// Admin endpoints (using ADMIN_API_KEY)

/**
 * @route GET /api/admin/comments
 * @desc Fetches comments for admin view with filtering by status and limit.
 * @access Admin
 * @queryparam {string} [status='pending'] - Filter comments by status (pending, approved, rejected, spam).
 * @queryparam {number} [limit=50] - Limit the number of comments returned (1-100).
 */
app.get('/api/admin/comments', [
  query('status').optional().isIn(['pending', 'approved', 'rejected', 'spam']).withMessage('status must be valid'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be 1-100'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { status = 'pending', limit = 50 } = req.query;
    const response = await makeApiRequest('get', '/read/comments', {}, { status, limit }, ADMIN_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to fetch admin comments');
  }
});

/**
 * @route PUT /api/admin/comments/:id
 * @desc Updates the status of a specific comment.
 * @access Admin
 * @param {number} id - The ID of the comment to update.
 * @bodyparam {string} status - The new status of the comment (approved, rejected, spam).
 */
app.put('/api/admin/comments/:id', [
  param('id').isInt().withMessage('id must be an integer'),
  body('status').isIn(['approved', 'rejected', 'spam']).withMessage('status must be approved, rejected, or spam'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ['status'];
    const filteredBody = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    const { status } = filteredBody;
    const response = await makeApiRequest('put', `/update/comments/${id}`, { status }, {}, ADMIN_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to update comment');
  }
});

/**
 * @route POST /api/admin/moderation-log
 * @desc Creates a new moderation log entry.
 * @access Admin
 * @bodyparam {number} comment_id - The ID of the comment being moderated.
 * @bodyparam {number} moderator_id - The ID of the moderator.
 * @bodyparam {string} action - The moderation action (approve, reject, spam, delete).
 * @bodyparam {string} [reason] - The reason for the moderation action.
 */
app.post('/api/admin/moderation-log', [
  body('comment_id').isInt().withMessage('comment_id must be an integer'),
  body('moderator_id').isInt().withMessage('moderator_id must be an integer'),
  body('action').isIn(['approve', 'reject', 'spam', 'delete']).withMessage('action must be valid'),
  body('reason').optional().isString().withMessage('reason must be a string'),
  handleValidationErrors
], async (req, res) => {
  try {
    const allowedFields = ['comment_id', 'moderator_id', 'action', 'reason'];
    const filteredBody = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    const { comment_id, moderator_id, action, reason } = filteredBody;
    const logData = {
      comment_id,
      moderator_id,
      action,
      reason: reason || null,
      automated: 0
    };
    const response = await makeApiRequest('post', '/create/moderation_log', logData, {}, ADMIN_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to create moderation log');
  }
});

/**
 * @route POST /api/users
 * @desc Registers a new user.
 * @access Admin (or specific registration key)
 * @bodyparam {string} name - The name of the user.
 * @bodyparam {string} email - The email of the user.
 * @bodyparam {string} password - The password for the user.
 */
app.post('/api/users', [
  body('name').isString().isLength({ min: 1, max: 255 }).withMessage('name is required and must be 1-255 characters'),
  body('email').isEmail().withMessage('email must be a valid email address'),
  body('password').isString().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  handleValidationErrors
], async (req, res) => {
  const allowedFields = ['name', 'email', 'password'];
  const filteredBody = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      filteredBody[field] = req.body[field];
    }
  });
  const { name, email, password } = filteredBody;
  try {
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    const userData = {
      name,
      email,
      password_hash,
      plan: 'free',
      sites_limit: 1,
      api_calls_limit: 1000,
      email_verified: 0,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString()
    };
    const response = await makeApiRequest('post', '/create/users', userData, {}, ADMIN_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to create user');
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticates a user and returns user data upon successful login.
 * @access Public
 * @bodyparam {string} email - The user's email address.
 * @bodyparam {string} password - The user's password.
 */
app.post('/api/auth/login', [
  body('email').isEmail().withMessage('email must be a valid email address'),
  body('password').isString().isLength({ min: 1 }).withMessage('password is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const allowedFields = ['email', 'password'];
    const filteredBody = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    const { email, password } = filteredBody;
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');

    const findUserResponse = await makeApiRequest('get', '/read/users', {}, { email: encodeURIComponent(email) }, ADMIN_API_KEY);

    if (!findUserResponse.data || findUserResponse.data.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: i18n.invalidEmailOrPassword
      });
    }

    const user = findUserResponse.data[0];

    if (user.password_hash !== password_hash) {
      return res.status(401).json({
        status: 'error',
        message: i18n.invalidEmailOrPassword
      });
    }

    const { password_hash: _, ...userWithoutPassword } = user;
    res.json({
      status: 'success',
      message: i18n.loginSuccessful,
      user: userWithoutPassword
    });

  } catch (error) {
    apiErrorHandler(error, res, 'Login failed');
  }
});

/**
 * @route GET /api/analytics/api-usage
 * @desc Fetches API usage data, optionally filtered by site_id and created_at_gte.
 * @access Admin
 * @queryparam {number} [site_id] - Filter by site ID.
 * @queryparam {string} [created_at_gte] - Filter by creation date greater than or equal to (ISO 8601).
 */
app.get('/api/analytics/api-usage', [
  query('site_id').optional().isInt().withMessage('site_id must be an integer'),
  query('created_at_gte').optional().isISO8601().withMessage('created_at_gte must be a valid date'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { site_id, created_at_gte } = req.query;
    const params = {};
    if (site_id) params.site_id = site_id;
    if (created_at_gte) params['created_at[gte]'] = created_at_gte;

    const response = await makeApiRequest('get', '/read/api_usage', {}, params, ADMIN_API_KEY);
    res.json(response);
  } catch (error) {
    apiErrorHandler(error, res, 'Failed to fetch API usage data');
  }
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Unhandled Error:`, err);
  res.status(500).json({
    status: 'error',
    message: i18n.internalServerError
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Indie Comments Backend Proxy running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Environment: ${config.NODE_ENV}`);
  console.log(`[${new Date().toISOString()}] Frontend URL: ${config.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;