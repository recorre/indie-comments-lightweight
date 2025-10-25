import { createTemplate } from './template.js';
import { createThread, fetchComments, fetchThreads } from './api.js';
import { getCachedComments, setCachedComments, downloadJSON, getDemoData, getDemoPageTitle } from './utils.js';
import i18n from './i18n.js';

/**
 * @class CommentWidget
 * @description A lightweight, dependency-free comment widget using Web Components.
 * @property {object} state - The internal state of the component.
 * @property {string} apiBaseUrl - The base URL for the API.
 */
class CommentWidget extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.commentObserver = null;

    this.state = {
      comments: [],
      isLoading: false,
      error: null,
      threadId: null,
      message: null,
    };
  }

  /**
   * @static
   * @returns {string[]} An array of attribute names to observe for changes.
   */
  static get observedAttributes() {
    return ['thread-id', 'page-title', 'api-base-url', 'theme'];
  }

  /**
   * @method connectedCallback
   * @description Called when the element is added to the DOM.
   */
  connectedCallback() {
    this._injectPicoCssIfNeeded();
    this._applyThemeFromUrl(); // Apply theme from URL parameter first
    this._applyThemeFromAttribute(); // Apply theme from attribute if set
    this.render();
    this._setupIntersectionObserver();
    this._setupThemeSelector();
    this._setupExportButtons();
    this._applyStoredTheme(); // Apply theme from localStorage after rendering
  }

  /**
   * @method attributeChangedCallback
   * @description Called when an observed attribute changes.
   * @param {string} name - The name of the attribute that changed.
   * @param {*} oldValue - The old value of the attribute.
   * @param {*} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'thread-id') {
      this.state.threadId = newValue;
      // Only load comments if the widget is already visible or if we are forced to load (e.g., initial load without observer)
      // For now, we will rely on the observer to trigger _loadComments.
      // If there's a scenario where comments should load immediately, this logic needs adjustment.
    } else if (name === 'theme') {
      this.state.currentTheme = newValue;
      this._changeTheme(newValue);
    }
  }

  /**
   * @getter apiBaseUrl
   * @returns {string} The base URL for the API.
   */
  get apiBaseUrl() {
    return this.getAttribute('api-base-url') || 'http://localhost:3001/api';
  }

  /**
   * @method render
   * @description Renders the component and updates child component properties.
   */
  render() {
    this.shadowRoot.innerHTML = createTemplate(this.state, this.apiBaseUrl, this.state.message, this.state.currentTheme || 'default');

    const commentList = this.shadowRoot.querySelector('comment-list');
    if (commentList) {
       commentList.comments = this.state.comments;
       commentList.onReply = this._setReplyTo.bind(this);
    }

    const commentForm = this.shadowRoot.querySelector('comment-form');
    if (commentForm) {
       commentForm.onCommentSubmitted = this._handleNewComment.bind(this);
    }
  }

  /**
   * @method _setState
   * @description Updates the component's state and re-renders.
   * @param {object} newState - The new state to merge.
   */
  _setState(newState) {
    Object.assign(this.state, newState);
    this.render();
  }

  /**
   * @method _setupIntersectionObserver
   * @description Sets up an IntersectionObserver to lazy load comments.
   * @private
   */
  _setupIntersectionObserver() {
    this.commentObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._initializeThread();
            observer.disconnect(); // Stop observing once intersected
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    this.commentObserver.observe(this);
  }

  /**
   * @method _initializeThread
   * @description Initializes the thread by either loading an existing one or creating a new one.
   * @private
   */
  async _initializeThread() {
    const threadId = this.getAttribute('thread-id');

    if (threadId) {
      this._setState({ threadId });
      this._loadComments();
    } else {
      await this._createThreadForPage();
    }
  }

  /**
   * @method _createThreadForPage
   * @description Creates a new thread for the current page if one doesn't exist.
   * @private
   */
  async _createThreadForPage() {
    this._setState({ isLoading: true, error: null });
    try {
      const threadData = {
        site_id: 1, // This may need to be configurable
        page_url: window.location.href,
        page_title: this.getAttribute('page-title') || document.title,
      };

      const data = await createThread(this.apiBaseUrl, threadData);
      this.setAttribute('thread-id', data.id);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error creating thread:`, error);
      let userFriendlyMessage = i18n.errorLoadingComments;
      if (error.message.includes('Erro no servidor')) {
        userFriendlyMessage = i18n.serverError;
      } else if (error.message.includes('Não foi possível conectar')) {
        userFriendlyMessage = i18n.connectionError;
      }
      this._setState({ error: userFriendlyMessage, isLoading: false });
    }
  }

  /**
   * @method _loadComments
   * @description Loads comments for the current thread from the API or demo data.
   * @private
   */
  async _loadComments() {
    if (!this.state.threadId) return;

    this._setState({ isLoading: true, error: null });
    try {
      // Check for demo data first
      const demoComments = this._getDemoComments();
      if (demoComments) {
        this._setState({ comments: demoComments, isLoading: false, message: i18n.demoCommentsLoaded });
        return;
      }

      const cached = getCachedComments();
      if (cached) {
        this._setState({ comments: cached, isLoading: false, message: i18n.localCommentsDisplayed });
        return;
      }

      const comments = await fetchComments(this.apiBaseUrl, this.state.threadId);
      setCachedComments(comments);
      this._setState({ comments, isLoading: false, message: null });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error loading comments:`, error);
      const cached = getCachedComments();
      if (cached) {
        this._setState({ comments: cached, isLoading: false, message: i18n.offlineCommentsDisplayed });
      } else {
        let userFriendlyMessage = i18n.errorLoadingComments;
        if (error.message.includes('Erro no servidor')) {
          userFriendlyMessage = i18n.serverError;
        } else if (error.message.includes('Não foi possível conectar')) {
          userFriendlyMessage = i18n.connectionError;
        }
        this._setState({ error: userFriendlyMessage, isLoading: false, message: null });
      }
    }
  }

  /**
    * @method _getDemoComments
    * @description Returns predefined demo comments for specific thread IDs.
    * @private
    * @returns {Array|null} Demo comments array or null if not a demo thread.
    */
   _getDemoComments() {
     return getDemoData(this.state.threadId);
   }

  /**
   * @method _injectPicoCssIfNeeded
   * @description Checks if Pico.css is already loaded and injects it if not.
   * @private
   */
  _injectPicoCssIfNeeded() {
    // Check if Pico.css is already loaded
    const existingLink = document.querySelector('link[href*="pico.min.css"]');
    if (existingLink) {
      return; // Already loaded, skip injection
    }

    // Inject Pico.css
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/pico.min.css'; // Relative path from widget location
    document.head.appendChild(link);
  }

  /**
    * @method _handleNewComment
    * @description Handles a new comment being added.
    * @param {object} comment - The new comment object.
    * @private
    */
   _handleNewComment(comment) {
     this._setState({
       comments: [...this.state.comments, comment],
     });
     // Clear cache after new comment to ensure fresh data on next load
     localStorage.removeItem('indie_comments_cache');
   }

  /**
   * @method _setReplyTo
   * @description Sets the form to reply to a specific comment.
   * @param {string} parentId - The ID of the parent comment.
   * @private
   */
  _setReplyTo(parentId) {
    const commentForm = this.shadowRoot.querySelector('comment-form');
    if (commentForm) {
      commentForm.setAttribute('parent-id', parentId);
    }
  }

  /**
   * @method _setupThemeSelector
   * @description Sets up the theme selector in the shadow DOM
   * @private
   */
  _setupThemeSelector() {
    const themeSelect = this.shadowRoot.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (event) => {
        this._changeTheme(event.target.value);
      });
    }
  }

  /**
   * @method _setupExportButtons
   * @description Sets up the export buttons in the shadow DOM
   * @private
   */
  _setupExportButtons() {
    const exportCurrent = this.shadowRoot.getElementById('exportCurrentThread');
    const exportAll = this.shadowRoot.getElementById('exportAllThreads');
    if (exportCurrent) {
      exportCurrent.addEventListener('click', () => this._exportCurrentThread());
    }
    if (exportAll) {
      exportAll.addEventListener('click', () => this._exportAllThreads());
    }
  }

  /**
   * @method _changeTheme
   * @description Changes the current theme and saves it to localStorage
   * @param {string} theme - The theme to apply
   * @private
   */
  _changeTheme(theme) {
    // Remove any existing theme links
    this._removeExistingTheme();

    if (theme && theme !== 'default') {
      // Load the CSS file for the selected theme
      const themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.href = `css/themes/${theme}.css`;
      themeLink.setAttribute('data-theme', 'indie-comments');
      document.head.appendChild(themeLink);
    }

    // Update URL with theme parameter if not default
    if (theme && theme !== 'default') {
      this._updateUrlWithTheme(theme);
    } else {
      this._removeThemeFromUrl();
    }

    // Save theme preference to localStorage
    this._saveThemeToStorage(theme);
    
    // Update the widget's internal state to reflect the theme
    this.state.currentTheme = theme;
    
    // Re-render to apply any theme-related changes to the template
    this.render();
  }

  /**
   * @method _removeExistingTheme
   * @description Removes existing theme CSS from the document
   * @private
   */
  _removeExistingTheme() {
    const existingThemeLinks = document.querySelectorAll('link[data-theme="indie-comments"]');
    existingThemeLinks.forEach(link => link.remove());
  }

  /**
   * @method _saveThemeToStorage
   * @description Saves the selected theme to localStorage
   * @param {string} theme - The theme to save
   * @private
   */
  _saveThemeToStorage(theme) {
    try {
      localStorage.setItem('indie_comments_theme', theme);
    } catch (e) {
      console.warn(`[${new Date().toISOString()}] Could not save theme preference to localStorage:`, e);
    }
  }

  /**
   * @method _applyStoredTheme
   * @description Applies the theme stored in localStorage
   * @private
   */
  _applyStoredTheme() {
    try {
      const storedTheme = localStorage.getItem('indie_comments_theme');
      if (storedTheme) {
        // Set the theme selector value
        const themeSelect = this.shadowRoot.getElementById('themeSelect');
        if (themeSelect) {
          themeSelect.value = storedTheme;
        }
        // Apply the theme
        this._changeTheme(storedTheme);
      }
    } catch (e) {
      console.warn(`[${new Date().toISOString()}] Could not retrieve theme preference from localStorage:`, e);
    }
  }

  /**
   * @method _applyThemeFromUrl
   * @description Checks URL for theme parameter and applies it
   * @private
   */
  _applyThemeFromUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const themeParam = urlParams.get('theme');
      
      if (themeParam) {
        // Set the theme selector value
        const themeSelect = this.shadowRoot.getElementById('themeSelect');
        if (themeSelect) {
          themeSelect.value = themeParam;
        }
        // Apply the theme
        this._changeTheme(themeParam);
      }
    } catch (e) {
      console.warn(`[${new Date().toISOString()}] Could not retrieve theme from URL:`, e);
    }
  }

  /**
   * @method _applyThemeFromAttribute
   * @description Applies theme from the theme attribute if set
   * @private
   */
  _applyThemeFromAttribute() {
    const themeAttr = this.getAttribute('theme');
    if (themeAttr) {
      this.state.currentTheme = themeAttr;
      this._changeTheme(themeAttr);
      // Set the theme selector value
      const themeSelect = this.shadowRoot.getElementById('themeSelect');
      if (themeSelect) {
        themeSelect.value = themeAttr;
      }
    }
  }

  /**
   * @method _updateUrlWithTheme
   * @description Updates the URL with the selected theme parameter
   * @param {string} theme - The theme to add to URL
   * @private
   */
  _updateUrlWithTheme(theme) {
    try {
      const url = new URL(window.location);
      url.searchParams.set('theme', theme);
      
      // Update URL without reloading the page
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      console.warn(`[${new Date().toISOString()}] Could not update URL with theme parameter:`, e);
    }
  }

  /**
   * @method _removeThemeFromUrl
   * @description Removes the theme parameter from the URL
   * @private
   */
  _removeThemeFromUrl() {
    try {
      const url = new URL(window.location);
      if (url.searchParams.has('theme')) {
        url.searchParams.delete('theme');
        
        // Update URL without reloading the page
        window.history.replaceState({}, document.title, url.toString());
      }
    } catch (e) {
      console.warn(`[${new Date().toISOString()}] Could not remove theme parameter from URL:`, e);
    }
  }

  /**
   * @method _exportCurrentThread
   * @description Exports the current thread's comments as JSON
   * @private
   */
  async _exportCurrentThread() {
    try {
      const comments = this.state.comments;
      const threadId = this.state.threadId;
      const exportData = {
        thread_id: threadId,
        comments: comments,
        exported_at: new Date().toISOString(),
        page_title: this.getAttribute('page-title') || 'Unknown Page'
      };
      downloadJSON(exportData, `thread_${threadId}_comments.json`);
      this._setState({ message: i18n.exportCompleted });
      setTimeout(() => this._setState({ message: null }), 3000);
    } catch (error) {
      console.error('Error exporting current thread:', error);
      this._setState({ message: i18n.exportFailed });
      setTimeout(() => this._setState({ message: null }), 3000);
    }
  }

  /**
   * @method _exportAllThreads
   * @description Exports all threads' comments as JSON
   * @private
   */
  async _exportAllThreads() {
    try {
      // For demo purposes, include demo threads
      const demoThreads = ['demo-article-1', 'demo-article-2', 'demo-article-3', 'demo-article-4'];
      const allComments = [];

      for (const threadId of demoThreads) {
        const demoComments = this._getDemoCommentsForThread(threadId);
        if (demoComments) {
          allComments.push({
            thread_id: threadId,
            page_title: this._getDemoPageTitle(threadId),
            comments: demoComments
          });
        }
      }

      // Try to fetch real threads if API is available
      try {
        const siteId = 1;
        const threads = await fetchThreads(this.apiBaseUrl, siteId);
        for (const thread of threads) {
          const comments = await fetchComments(this.apiBaseUrl, thread.id);
          allComments.push({
            thread_id: thread.id,
            page_title: thread.page_title || 'Unknown Page',
            comments: comments
          });
        }
      } catch (apiError) {
        console.warn(`[${new Date().toISOString()}] API not available, using only demo data for export`);
      }

      downloadJSON({
        threads: allComments,
        exported_at: new Date().toISOString(),
        total_threads: allComments.length
      }, 'all_threads_comments.json');
      this._setState({ message: '💾 Exportação concluída' });
      setTimeout(() => this._setState({ message: null }), 3000);
    } catch (error) {
      console.error('Error exporting all threads:', error);
      this._setState({ message: '⚠️ Falha ao exportar comentários' });
      setTimeout(() => this._setState({ message: null }), 3000);
    }
  }

  /**
    * @method _getDemoCommentsForThread
    * @description Gets demo comments for a specific thread ID
    * @param {string} threadId - The thread ID
    * @private
    * @returns {Array|null} Demo comments or null
    */
   _getDemoCommentsForThread(threadId) {
     return getDemoData(threadId);
   }

  /**
    * @method _getDemoPageTitle
    * @description Gets the page title for demo threads
    * @param {string} threadId - The thread ID
    * @private
    * @returns {string} Page title
    */
   _getDemoPageTitle(threadId) {
     return getDemoPageTitle(threadId);
   }

}

// Define the custom element
customElements.define('comment-widget', CommentWidget);