import i18n from './i18n.js';

/**
 * Creates the HTML template for the comment widget.
 * @param {object} state - The current state of the widget.
 * @param {string} apiBaseUrl - The base URL for the API.
 * @param {string} message - Optional message to display
 * @param {string} theme - The theme to apply (default: 'default')
 * @returns {string} The HTML template string.
 */
export function createTemplate(state, apiBaseUrl, message = null, theme = 'default') {
  const commentCount = state.comments ? state.comments.length : 0;

  // Function to sanitize text content against XSS
  function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return `
    <style>
      :host {
        display: block;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }

      ${theme === 'dark' ? `
      /* Dark Theme Styles */
      :host {
        --bg-color: #1a1a1a;
        --text-color: #f0f0f0;
        --border-color: #444;
        --button-bg: #333;
        --button-hover: #555;
        --input-bg: #2a2a2a;
        --input-border: #555;
        --card-bg: #222;
      }
      .comment-widget {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background-color: var(--card-bg);
        color: var(--text-color);
      }
      .loading {
        text-align: center;
        padding: 1rem;
        color: var(--text-color);
      }
      .error {
        color: #f87171;
        background-color: #450a0a;
        padding: 0.75rem;
        border-radius: 0.375rem;
        margin: 0.5rem 0;
      }
      .comment-form-container {
        margin-bottom: 1.5rem;
      }
      .comments-header {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        color: var(--text-color);
      }
      .comments-count {
        font-weight: 600;
        color: var(--text-color);
        font-size: 1.1rem;
      }
      .export-buttons {
        display: flex;
        gap: 0.5rem;
      }
      .export-btn {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: 0.25rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        cursor: pointer;
        font-size: 0.85rem;
      }
      .export-btn:hover {
        background-color: var(--button-hover);
      }
      .theme-selector select {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: 0.25rem;
        font-size: 0.85rem;
        background-color: var(--input-bg);
        color: var(--text-color);
      }
      .info-message {
        background-color: #1e3a8a;
        color: #bfdbfe;
        border: 1px solid #3730a3;
      }
      ` : theme === 'matrix' ? `
      /* Matrix Theme Styles */
      :host {
        --bg-color: #000;
        --text-color: #0f0;
        --border-color: #0a0;
        --button-bg: #020;
        --button-hover: #040;
        --input-bg: #010;
        --input-border: #080;
        --card-bg: #000;
      }
      .comment-widget {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background-color: var(--card-bg);
        color: var(--text-color);
        font-family: 'Courier New', monospace;
      }
      .loading {
        text-align: center;
        padding: 1rem;
        color: var(--text-color);
      }
      .error {
        color: #f87171;
        background-color: #1c1917;
        padding: 0.75rem;
        border-radius: 0.375rem;
        margin: 0.5rem 0;
        border: 1px solid var(--border-color);
      }
      .comment-form-container {
        margin-bottom: 1.5rem;
      }
      .comments-header {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        color: var(--text-color);
      }
      .comments-count {
        font-weight: 600;
        color: var(--text-color);
        font-size: 1.1rem;
      }
      .export-buttons {
        display: flex;
        gap: 0.5rem;
      }
      .export-btn {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: 0.25rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        cursor: pointer;
        font-size: 0.85rem;
        font-family: 'Courier New', monospace;
      }
      .export-btn:hover {
        background-color: var(--button-hover);
      }
      .theme-selector select {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--input-border);
        border-radius: 0.25rem;
        font-size: 0.85rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        font-family: 'Courier New', monospace;
      }
      .info-message {
        background-color: #1e3a8a;
        color: #bfdbfe;
        border: 1px solid #3730a3;
      }
      ` : theme === 'neocities' ? `
      /* NeoCities Theme Styles */
      :host {
        --bg-color: #ffffcc;
        --text-color: #330033;
        --border-color: #996699;
        --button-bg: #ffccff;
        --button-hover: #ff99ff;
        --input-bg: #ffff99;
        --input-border: #669966;
        --card-bg: #ccffff;
      }
      .comment-widget {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 2px dashed var(--border-color);
        border-radius: 0.5rem;
        background: linear-gradient(135deg, #ffffcc, #ffccff);
        color: var(--text-color);
      }
      .loading {
        text-align: center;
        padding: 1rem;
        color: var(--text-color);
      }
      .error {
        color: var(--text-color);
        background-color: #fca5a5;
        padding: 0.75rem;
        border-radius: 0.375rem;
        margin: 0.5rem 0;
        border: 2px solid #b91c1c;
      }
      .comment-form-container {
        margin-bottom: 1.5rem;
      }
      .comments-header {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dotted var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        color: var(--text-color);
      }
      .comments-count {
        font-weight: 600;
        color: var(--text-color);
        font-size: 1.1rem;
      }
      .export-buttons {
        display: flex;
        gap: 0.5rem;
      }
      .export-btn {
        padding: 0.25rem 0.5rem;
        border: 2px dotted var(--input-border);
        border-radius: 0.25rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        cursor: pointer;
        font-size: 0.85rem;
        font-family: 'Courier New', monospace;
      }
      .export-btn:hover {
        background-color: var(--button-hover);
      }
      .theme-selector select {
        padding: 0.25rem 0.5rem;
        border: 2px dotted var(--input-border);
        border-radius: 0.25rem;
        font-size: 0.85rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        font-family: 'Courier New', monospace;
      }
      .info-message {
        background-color: #a5b4fc;
        color: #3730a3;
        border: 1px solid #4f46e5;
      }
      ` : `
      /* Default/Pico CSS compatible styles */
      .comment-widget {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        background-color: #fff;
      }
      .loading {
        text-align: center;
        padding: 1rem;
      }
      .error {
        color: #dc2626;
        background-color: #fef2f2;
        padding: 0.75rem;
        border-radius: 0.375rem;
        margin: 0.5rem 0;
      }
      .comment-form-container {
        margin-bottom: 1.5rem;
      }
      .comments-header {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .comments-count {
        font-weight: 600;
        color: #374151;
        font-size: 1.1rem;
      }
      .export-buttons {
        display: flex;
        gap: 0.5rem;
      }
      .export-btn {
        padding: 0.25rem 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        background-color: #f9fafb;
        color: #374151;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .export-btn:hover {
        background-color: #f3f4f6;
      }
      .theme-selector select {
        padding: 0.25rem 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        background-color: #fff;
      }
      `}
    </style>

    <div class="comment-widget">
      <div class="comments-header">
        <div class="comments-count">💬 ${commentCount} ${commentCount === 1 ? i18n.commentSingular : i18n.commentPlural}</div>
        <div class="export-buttons">
          <button id="exportCurrentThread" class="export-btn">📤 ${i18n.exportCurrentThread}</button>
          <button id="exportAllThreads" class="export-btn">📤 ${i18n.exportAllThreads}</button>
        </div>
        <div class="theme-selector">
          <label for="themeSelect">${i18n.themeLabel}</label>
          <select id="themeSelect">
            <option value="default">${i18n.defaultTheme}</option>
            <option value="dark">${i18n.darkTheme}</option>
            <option value="matrix">${i18n.matrixTheme}</option>
            <option value="neocities">${i18n.neocitiesTheme}</option>
          </select>
        </div>
      </div>
      <style>
        .info-message {
          background-color: #e0f2fe; /* Light blue background */
          color: #0288d1; /* Darker blue text */
          padding: 0.75rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          border: 1px solid #90caf9; /* Border color */
          font-size: 0.9rem;
          text-align: center;
        }
      </style>
      
      ${state.isLoading ? `<div class="loading">${i18n.loadingComments}</div>` : ''}
      ${state.error ? `<div class="error">${i18n.errorPrefix} ${sanitize(state.error)}</div>` : ''}
      ${message ? `<div class="info-message">${sanitize(message)}</div>` : ''}
      
      <div class="comment-form-container">
        <comment-form thread-id="${state.threadId}" api-base-url="${apiBaseUrl}"></comment-form>
      </div>
      
      <div class="comments-container">
        <comment-list></comment-list>
      </div>
    </div>
  `;
}