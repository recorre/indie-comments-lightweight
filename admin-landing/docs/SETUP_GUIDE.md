# Setup Guide for Admin and Landing Pages

## Overview
This guide explains how to set up the lightweight admin dashboard and landing page for the Indie Comments widget.

## Prerequisites
- Backend proxy server running (e.g., at http://localhost:3001)
- Admin API key for backend authentication
- Web server to host the static files

## Installation

### 1. File Structure
Place the files in your web server directory:
```
your-web-root/
├── index.html          # Landing page
├── admin.html          # Admin dashboard
├── css/
│   ├── pico.min.css    # PicoCSS framework
│   └── custom.css      # Custom styles
├── js/
│   └── admin.js        # Admin functionality
└── docs/
    ├── API_REFERENCE.md # API documentation
    └── SETUP_GUIDE.md   # This file
```

### 2. Backend Configuration
1. Ensure your backend proxy is running at the configured URL (default: `http://localhost:3001/api`)
2. Update the `API_BASE_URL` in admin.html if needed
3. Have your admin API key ready

### 3. Admin Authentication
The admin dashboard expects the admin API key to be stored in localStorage:
```javascript
localStorage.setItem('adminApiKey', 'your-actual-admin-key');
```

In a production environment, you'd typically have a login form that authenticates the user and stores the key only after successful authentication.

### 4. Customization
- Update the landing page content to match your branding
- Modify colors in custom.css if needed
- Adjust API endpoints in admin.js if your backend URL differs

## Security Considerations
- Always use HTTPS in production
- Store the admin API key securely
- Implement proper authentication in production
- The landing page is static and can be cached aggressively
- Admin page requires authentication to access comment moderation features

## Deployment
### Static Hosting
Both pages are static HTML files that can be hosted on any static hosting service:
- Netlify, Vercel, GitHub Pages, etc.
- Traditional web servers (Apache, Nginx)

### Backend Communication
- Landing page only needs to be able to reach the backend proxy
- Admin dashboard needs to authenticate with the backend proxy
- All API keys remain server-side in the backend proxy

## Maintenance
- The static landing page requires no maintenance once deployed
- The admin dashboard has minimal JavaScript dependencies
- Updates to functionality only require updating the HTML/JS files
- Backend API changes may require updates to admin.js