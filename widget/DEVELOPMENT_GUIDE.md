# Development Guide for Lightweight Comment Widget

## Overview
This document provides guidance for developing and maintaining the lightweight comment widget using Web Components and vanilla JavaScript.

## Project Structure
```
lightweight-comment-widget/
├── README.md                 # Project overview
├── API_REFERENCE.md          # API documentation
├── DEVELOPMENT_GUIDE.md      # This document
├── index.html               # Demo page
├── src/
│   ├── comment-widget.js    # Main web component
│   ├── comment-form.js      # Comment submission form
│   └── comment-list.js      # Comment display component
├── css/
│   ├── pico.min.css         # PicoCSS framework
│   └── widget.css           # Custom widget styles
└── dist/
    └── comment-widget.min.js # Production build
```

## Web Component Architecture

### Main Component: `<comment-widget>`
The main web component handles:
- Loading comment threads
- Managing state
- Coordinating sub-components
- API communication

### Sub-components:
- `<comment-form>` - Handles new comment submissions
- `<comment-list>` - Displays existing comments

## API Integration

### Backend Proxy
The widget communicates with the backend proxy server running at:
- Development: `http://localhost:3001/api/`
- Production: `[configured backend URL]`

### Endpoints Used
- `GET /api/comments?thread_id={id}` - Fetch comments
- `POST /api/comments` - Submit new comment
- `POST /api/threads` - Create new thread if needed

## Implementation Guidelines

### JavaScript Best Practices
- Use vanilla JavaScript without frameworks
- Implement proper error handling
- Ensure cross-browser compatibility
- Use efficient DOM manipulation
- Implement proper event handling and cleanup

### Web Components Standards
- Extend HTMLElement for custom elements
- Use Shadow DOM for encapsulation
- Implement proper lifecycle callbacks
- Use template literals for DOM creation
- Follow custom element naming conventions (hyphen required)

### Styling Guidelines
- Use PicoCSS for base styles
- Add minimal custom CSS only when necessary
- Ensure responsive design
- Maintain accessibility standards
- Use CSS custom properties for theming

## Cross-Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Include Web Components polyfill if needed for older browsers
- Test on mobile devices
- Ensure graceful degradation

## Security Considerations
- All API keys remain server-side in the proxy
- Validate all user inputs on the server
- Implement proper CORS configuration
- Use HTTPS in production

## Performance Optimization
- Minimize HTTP requests
- Implement efficient rendering
- Use event delegation where appropriate
- Implement proper caching strategies
- Keep bundle size minimal

## Markdown Support
The comment display includes basic Markdown support:
- Headers: `#`, `##`, `###`
- Bold: `**text**` or `__text__`
- Italic: `*text*` or `_text_`
- Links: `[text](url)`
- Inline code: `` `code` ``
- Code blocks: ````code````
- Unordered lists: `* item`

All Markdown-generated HTML is sanitized to prevent XSS attacks.

## Testing Checklist
- Comment loading functionality
- New comment submission
- Form validation
- Error handling
- Responsive design
- Cross-browser compatibility
- Accessibility features