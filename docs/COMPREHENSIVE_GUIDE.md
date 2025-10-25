# Indie Comments - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [API Reference](#api-reference)
5. [Components](#components)
6. [Security](#security)
7. [Deployment](#deployment)

## Overview
Indie Comments is a lightweight, privacy-focused comment system that consists of:
- A backend proxy server (Node.js/Express)
- A lightweight comment widget (Web Components)
- Admin dashboard (vanilla HTML/CSS/JS)
- Landing page (static HTML)

The system protects API keys by keeping them server-side while providing a seamless commenting experience.

## Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   User's        │    │  Backend Proxy   │    │  External API    │
│   Browser       │───▶│  (server/)       │───▶│  (no-code       │
│                 │    │                  │    │   backend)       │
│  - Widget      │    │  - API Key       │    │                  │
│  - Admin       │    │    management    │    │  - Comments      │
│  - Landing     │    │  - Rate limiting │    │  - Threads       │
│                │    │  - Validation    │    │  - Users         │
└─────────────────┘    └──────────────────┘    └──────────────────┘
```

### Components:
1. **Backend Proxy** - Secures API keys and handles requests
2. **Comment Widget** - Lightweight Web Component
3. **Admin Dashboard** - Moderate comments
4. **Landing Page** - Static marketing page

## Setup Instructions

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd indie-comments-lightweight/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

4. Start the server:
   ```bash
   npm run dev  # For development
   npm start    # For production
   ```

### Frontend Usage
All frontend components are static and can be opened directly in the browser:
- **Widget demo**: `widget/index.html`
- **Landing page**: `admin-landing/index.html` 
- **Admin dashboard**: `admin-landing/admin.html`

## API Reference

### Widget Endpoints (Public)
- `GET /api/comments?thread_id={id}&status={status}` - Fetch comments
- `POST /api/comments` - Submit comment
- `POST /api/threads` - Create thread

### Admin Endpoints (Protected)
- `GET /api/admin/comments?status={status}&limit={limit}` - Fetch comments
- `PUT /api/admin/comments/{id}` - Update comment status
- `POST /api/admin/moderation-log` - Log moderation

All endpoints require proper API keys set in server environment.

## Components

### Comment Widget
- Built with Web Components (custom elements + shadow DOM)
- Supports Markdown formatting
- Responsive design with PicoCSS
- Client-side validation
- Lightweight (~5KB)

### Admin Dashboard
- Comment moderation interface
- Status filtering
- Approval/rejection functionality
- Statistics display
- Secure API communication

### Landing Page
- Static marketing page
- Widget demonstration
- Integration instructions
- Responsive design

## Security

### Backend Security
- API keys stored server-side only
- CORS configured for specific origins
- Rate limiting implemented
- Input validation on all endpoints
- Helmet.js for security headers

### Frontend Security
- HTML sanitization for comments
- XSS prevention
- Secure API communication
- No direct API key exposure

## Deployment

### Backend Server
1. Set environment variables:
   - `NODE_ENV=production`
   - `FRONTEND_URL` to your frontend domain
   - API keys properly configured

2. Deploy options:
   - Railway, Vercel, Heroku, or any Node.js hosting
   - Docker containerization support

### Frontend Files
- Static files can be hosted anywhere (Netlify, Vercel, S3, etc.)
- No server-side requirements
- CDN-friendly

### Configuration
Update the frontend to use your backend URL:
```javascript
// In widget files, update the API base URL if needed
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## Development

### Running Locally
1. Start backend: `cd server && npm run dev`
2. Access frontend files directly in browser
3. For development server: `npx serve .`

### Adding Features
- Widget components are in `/widget/src`
- Admin functionality is in `/admin-landing/js`
- Styles are in respective `/css` folders

## Troubleshooting

### Common Issues
- Backend not starting: Check `.env` file configuration
- Widget not loading: Verify backend is running and accessible
- Admin errors: Check browser console and API key configuration

### API Keys
- Ensure all required API keys are set in backend `.env` file
- Keys should never be exposed to frontend
- Use different keys for public and admin access