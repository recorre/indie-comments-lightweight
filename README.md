# Indie Comments - Lightweight Version

[![Node.js Version](https://img.shields.io/badge/node.js-18.0+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](#)

## Overview

Indie Comments is a lightweight, modular commenting system designed for easy integration into any website. This version focuses on minimal dependencies and maximum performance, using vanilla HTML, CSS, and JavaScript with Web Components.

The project consists of three main components:

- **Backend Proxy Server**: A secure Node.js server that manages API keys, handles comment data, and provides a clean API interface for the frontend.
- **Comment Widget**: A lightweight, embeddable comment widget built with Web Components, supporting Markdown, responsive design, and easy customization.
- **Admin and Landing Pages**: Static pages for showcasing the widget and managing comment moderation, built with vanilla JS and styled with PicoCSS.

This architecture ensures secure API communication, fast loading times, and flexibility for customization.

## Demo GIFs

See the widget in action with these demo GIFs:

![Default Theme Demo](demo-gifs/default-theme.gif)

![Dark Theme Demo](demo-gifs/dark-theme.gif)

![Matrix Theme Demo](demo-gifs/matrix-theme.gif)

![NeoCities Theme Demo](demo-gifs/neocities-theme.gif)

*Note: GIFs are placeholders. You can create them by recording the demo.html page.*

## Installation

### Backend Setup

1. Navigate to the backend server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` to add your API keys and configuration.

### Frontend Setup

No build step is required for the frontend components. Simply open the HTML files in a browser or serve them via a static web server.

- Widget demo page: `widget/index.html`
- Landing page: `admin-landing/index.html`
- Admin dashboard: `admin-landing/admin.html`

## Quick Setup

For a quick start, run the following commands:

1. Start the backend server:
   ```bash
   cd server && npm run dev
   ```
2. In another terminal, start the widget demo:
   ```bash
   cd widget && npm run dev
   ```

Then, open `demo.html` in your browser to see the widgets in action.

For deployment, refer to [docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md).

## Running Locally

### Start Backend Server

From the `server` directory, run:

```bash
npm run dev
```

This starts the backend proxy server with auto-reload on `http://localhost:3001`.

### Open Frontend Pages

Open the following files in your browser or serve them via a static server:

- Widget demo: `widget/index.html`
- Landing page: `admin-landing/index.html`
- Admin dashboard: `admin-landing/admin.html`

Ensure the backend server is running to enable API communication.

## Customization

### Comment Widget

The comment widget is highly customizable via HTML attributes:

| Attribute     | Description                          | Default  |
|---------------|----------------------------------|----------|
| `thread-id`   | Unique identifier for comment thread | Required |
| `api-base-url`| Base URL for API endpoints          | `/api`   |

You can customize styles by modifying `widget/css/widget.css` or overriding styles in your own CSS.

### Admin and Landing Pages

- Modify `admin-landing/index.html` and `admin-landing/admin.html` to update content and layout.
- Customize styles in `admin-landing/css/custom.css`.
- Update API endpoints or keys in `admin-landing/js/admin.js` if your backend URL differs.

## HTML Embed Example

To embed the comment widget in your HTML page, add the following code:

```html
<comment-widget
  thread-id="your-unique-thread-id"
  page-title="Your Page Title"
  api-base-url="http://localhost:3001/api">
</comment-widget>
```

Include the necessary scripts at the end of your HTML:

```html
<script type="module" src="path/to/widget/src/comment-list.js"></script>
<script type="module" src="path/to/widget/src/comment-form.js"></script>
<script type="module" src="path/to/widget/src/comment-widget.js"></script>
```

For production, use the minified versions from the `dist` folder.

## Theme Switching

The widget supports multiple themes. Set the `theme` attribute to switch themes:

- Default: No theme attribute or `theme=""`
- Dark: `theme="dark"`
- Matrix: `theme="matrix"`
- NeoCities: `theme="neocities"`

Example:

```html
<comment-widget
  thread-id="example-thread"
  theme="dark"
  api-base-url="http://localhost:3001/api">
</comment-widget>
```

## 🏁 Demo rápida

Para uma demonstração rápida, execute os seguintes comandos:

```bash
npm start  # Para o servidor backend
npm run demo  # Para o widget demo
```

Em seguida, abra `demo.html` no navegador para ver os widgets em ação.

*Nota: Ajuste os caminhos se executando de diretórios diferentes. Para backend: `cd server && npm start`. Para widget: `cd widget && npm run dev`.*

## Project Structure

```
indie-comments-lightweight/
├── README.md                 # Project overview and instructions
├── server/                   # Backend proxy server
│   ├── server.js            # Main server application
│   ├── package.json         # Server dependencies and scripts
│   ├── .env.example         # Environment variable template
│   └── README.md            # Server-specific documentation
├── widget/                  # Comment widget frontend
│   ├── index.html           # Widget demo page
│   ├── src/                 # Widget source JavaScript files
│   ├── css/                 # Widget stylesheets
│   └── README.md            # Widget-specific documentation
├── admin-landing/           # Admin dashboard and landing pages
│   ├── index.html           # Landing page
│   ├── admin.html           # Admin dashboard page
│   ├── css/                 # Stylesheets for admin and landing pages
│   ├── js/                  # JavaScript for admin functionality
│   └── README.md            # Admin/landing documentation
└── docs/                    # Additional documentation
    ├── API_REFERENCE.md     # API details
    ├── SETUP_GUIDE.md       # Setup instructions
    └── RAILWAY_DEPLOYMENT.md # Deployment guide for Railway platform
```

## Deployment

### Frontend Static Hosting

The widget demo, landing page, and admin dashboard are static HTML/CSS/JS files that can be hosted on any static hosting platform such as:

- Netlify
- Vercel
- GitHub Pages
- Traditional web servers (Apache, Nginx)

Simply upload the contents of the `widget` and `admin-landing` folders to your hosting service.

### Backend Proxy Server Deployment

- Deploy the backend proxy server to any Node.js compatible hosting platform.
- Set environment variables according to your `.env` configuration.
- Ensure HTTPS is enabled for secure API communication.
- Configure CORS to allow requests from your frontend domains.
- Monitor logs and performance for production readiness.

For detailed deployment instructions, refer to [docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md).
