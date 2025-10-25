# Indie Comments Backend Proxy

A secure backend proxy service for the Indie Comments widget that protects API keys and provides a clean API interface.

Para documentação completa, consulte o [guia completo](../docs/COMPREHENSIVE_GUIDE.md) na pasta docs.

## Features

- 🔒 **Secure API Key Management**: API keys are stored server-side, never exposed to the frontend
- 🛡️ **Security Middleware**: Helmet, CORS, rate limiting, and input validation
- 📝 **Comment Management**: Create, read, and moderate comments through secure endpoints
- 👨‍💼 **Admin Panel Support**: Dedicated endpoints for comment moderation
- 📊 **Analytics**: API usage tracking and analytics
- ⚡ **Performance**: Efficient proxying with proper error handling

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your actual API keys:
   ```env
   API_BASE_URL=https://openapi.nocodebackend.com
   INSTANCE=41300_indie_commentsv3
   PUBLIC_API_KEY=your_public_widget_key_here
   ADMIN_API_KEY=your_admin_key_here
   SYSTEM_API_KEY=your_system_key_here
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   npm run dev  # Development with auto-reload
   npm start    # Production
   ```

## API Endpoints

### Widget Endpoints (Public)
- `GET /api/comments?thread_id={id}&status=approved` - Fetch approved comments
- `POST /api/comments` - Submit new comment
- `POST /api/threads` - Create comment thread

### Admin Endpoints
- `GET /api/admin/comments?status=pending` - Fetch pending comments
- `PUT /api/admin/comments/{id}` - Update comment status
- `POST /api/admin/moderation-log` - Log moderation actions

### Analytics
- `GET /api/analytics/api-usage` - API usage statistics

## Security Features

- **API Key Protection**: Keys never leave the server
- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured for specific frontend domains
- **Error Handling**: Secure error responses without sensitive data leakage

## Development

```bash
npm run dev      # Start with nodemon
npm test         # Run tests
npm run lint     # Lint code
```

## Deployment

1. Set environment variables in your deployment platform
2. Ensure HTTPS is enabled
3. Configure proper CORS origins
4. Set up monitoring and logging

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_BASE_URL` | External API base URL | Yes |
| `INSTANCE` | API instance identifier | Yes |
| `PUBLIC_API_KEY` | Key for public widget operations | Yes |
| `ADMIN_API_KEY` | Key for admin operations | Yes |
| `SYSTEM_API_KEY` | Full access key for system operations | No |
| `PORT` | Server port | No (default: 3001) |
| `FRONTEND_URL` | Allowed frontend origin | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No |

## License

MIT