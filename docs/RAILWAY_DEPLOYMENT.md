# Deployment Guide for Backend Server

## Deploying to Railway

This guide explains how to deploy only the backend server to Railway without the frontend components.

### Prerequisites
- Railway account (https://railway.app)
- Backend server code with proper package.json
- API keys ready for configuration

### Step-by-Step Deployment

#### 1. Prepare Backend-Only Directory
Create a directory containing only the backend files:

```bash
# From the indie-comments-lightweight directory
cd indie-comments-lightweight/server

# Or create a standalone backend directory
mkdir indie-comments-backend
cp -r indie-comments-lightweight/server/* indie-comments-backend/
cd indie-comments-backend
```

#### 2. Verify package.json
Ensure your package.json has the correct start script:

```json
{
  "name": "indie-comments-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

#### 3. Deploy to Railway

1. **Via Railway CLI:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   railway init
   
   # Link to your project
   railway link
   
   # Deploy
   railway up
   ```

2. **Via GitHub Integration:**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository containing only the backend code
   - Complete the setup

#### 4. Configure Environment Variables

In Railway's dashboard, under your project's "Variables" section, add:

```
API_BASE_URL=https://openapi.nocodebackend.com
INSTANCE=41300_indie_commentsv3
PUBLIC_API_KEY=your_public_key_here
ADMIN_API_KEY=your_admin_key_here
SYSTEM_API_KEY=your_system_key_here  # optional
PORT=PORT                           # Railway's dynamic port (set as PORT=PORT)
FRONTEND_URL=https://your-frontend-domain.com  # Your frontend URL
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000         # 15 minutes (optional)
RATE_LIMIT_MAX_REQUESTS=100         # requests per window (optional)
```

**Important:** The `PORT` variable should be set to `PORT=PORT` so Railway can inject its dynamic port assignment.

#### 5. Configure Build Settings (if needed)

In Railway, make sure:
- **Build Command**: `npm install` (usually auto-detected)
- **Start Command**: `npm start` or `node server.js`
- **Root Directory**: `/` (or leave as default)

#### 6. Verify Deployment

After deployment:
1. Check the logs for any errors
2. Verify the service is running on the assigned URL
3. Test the health endpoint: `https://your-project-name.up.railway.app/health`

### Troubleshooting

#### Common Issues:

1. **Port Binding Error:**
   - Ensure `PORT` environment variable is set in Railway
   - Server.js should use `process.env.PORT`

2. **Missing Dependencies:**
   - Verify all dependencies are in package.json
   - Check that package-lock.json is present

3. **Environment Variables:**
   - Ensure all required API keys are set
   - Check for typos in variable names

4. **Startup Timeout:**
   - Make sure the start command is correct
   - Check that the server properly binds to the assigned PORT

### Production Considerations

#### Security:
- Use HTTPS in production
- Rotate API keys regularly
- Monitor API usage
- Implement proper error handling

#### Performance:
- Configure appropriate rate limiting
- Monitor response times
- Consider caching strategies

#### Monitoring:
- Check Railway logs regularly
- Set up alerts for errors
- Monitor API usage statistics

### Frontend Integration

Once your backend is deployed:
1. Update your frontend to point to the new Railway backend URL
2. Example: Change API calls from `http://localhost:3001/api` to `https://your-project-name.up.railway.app/api`
3. Update CORS configuration in your frontend if needed

### Scaling

Railway will automatically handle scaling based on traffic, but you can:
- Monitor resource usage
- Upgrade plan if needed
- Configure environment variables for scaling options