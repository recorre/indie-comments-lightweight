/**
 * CommentList - Sub-component for displaying comments
 * 
 * Features:
 * - Display comment hierarchy
 * - Format dates
 * - Handle loading states
 * - Nested comment support
 */

import { getCachedComments, setCachedComments, formatContent, formatDate } from './utils.js';
import i18n from './i18n.js';

class CommentList extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // State management
    this.state = {
      comments: [],
      loading: false
    };
  }

  static get observedAttributes() {
    return ['comments'];
  }

  set onReply(callback) {
    this._onReply = callback;
  }

  connectedCallback() {
    // Parse comments from attribute if available
    const commentsAttr = this.getAttribute('comments');
    if (commentsAttr) {
      try {
        this.state.comments = JSON.parse(commentsAttr) || [];
      } catch (e) {
        console.error('Error parsing comments attribute:', e);
        this.state.comments = [];
      }
    }
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'comments' && oldValue !== newValue) {
      try {
        const newComments = newValue ? JSON.parse(newValue) : [];
        // Only update and render if comments have actually changed
        if (JSON.stringify(this.state.comments) !== JSON.stringify(newComments)) {
          this.state.comments = newComments;
          this.render();
        }
      } catch (e) {
        console.error(`[${new Date().toISOString()}] Error parsing comments attribute:`, e);
        this.state.comments = [];
        this.render();
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .comments-container {
          margin-top: 1rem;
        }
        
        .comment {
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          background-color: #fff;
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .comment-author {
          font-weight: 600;
          color: #1f2937;
        }
        
        .comment-date {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .comment-content {
          line-height: 1.6;
          color: #374151;
        }
        
        .comment-content a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .comment-content a:hover {
          color: #2563eb;
        }
        
        .reply-link {
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }
        
        .reply-link a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        
        .replies {
          margin-top: 1rem;
          padding-left: 1.5rem;
          border-left: 2px solid #e5e7eb;
        }
      </style>
    `;
    
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    commentsContainer.appendChild(this.renderComments());
    this.shadowRoot.appendChild(commentsContainer);
  }

  renderComments() {
    if (!this.state.comments || this.state.comments.length === 0) {
      const p = document.createElement('p');
      p.textContent = i18n.noCommentsYet;
      const fragment = document.createDocumentFragment();
      fragment.appendChild(p);
      return fragment;
    }
    
    // Group comments by parent_id for easier hierarchical rendering
    const commentsByParent = this.groupCommentsByParent(this.state.comments);
    
    // Render top-level comments (those with no parent or parent_id = null)
    return this.renderCommentTree(commentsByParent, null, 0);
  }

  /**
   * Groups comments by their parent_id for hierarchical rendering.
   * @param {Array} comments - The array of comments to group.
   * @returns {Object} An object with parent IDs as keys and arrays of comments as values.
   */
  groupCommentsByParent(comments) {
    const grouped = {};
    comments.forEach(comment => {
      const parentId = comment.parent_id || null;
      if (!grouped[parentId]) {
        grouped[parentId] = [];
      }
      grouped[parentId].push(comment);
    });
    return grouped;
  }

  /**
   * Recursively renders the comment tree up to a specified depth.
   * @param {Object} commentsByParent - Comments grouped by parent ID.
   * @param {string|null} parentId - The parent ID to render comments for.
   * @param {number} level - The current nesting level (default: 0).
   * @returns {DocumentFragment|null} The rendered comment tree or null if max level exceeded.
   */
  renderCommentTree(commentsByParent, parentId, level = 0) {
    if (level > 2) return null; // Limit to 3 levels (0, 1, 2)
    const comments = commentsByParent[parentId] || [];
    const fragment = document.createDocumentFragment();

    comments.forEach(comment => {
        const children = this.renderCommentTree(commentsByParent, comment.id, level + 1);
        fragment.appendChild(this._createCommentElement(comment, commentsByParent, level, children));
      });

    return fragment;
  }


  /**
   * Creates a single comment element with header, content, and reply link.
   * @param {Object} comment - The comment object.
   * @param {Object} commentsByParent - Comments grouped by parent ID.
   * @param {number} level - The nesting level.
   * @param {DocumentFragment|null} children - Child comments.
   * @returns {HTMLElement} The comment element.
   * @private
   */
  _createCommentElement(comment, commentsByParent, level = 0, children = null) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment', `comment-level-${level}`);
    commentDiv.dataset.commentId = comment.id;

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('comment-header');

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('comment-author');
    authorDiv.textContent = comment.author_name;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('comment-date');
    dateDiv.textContent = formatDate(comment.created_at);

    headerDiv.appendChild(authorDiv);
    headerDiv.appendChild(dateDiv);
    commentDiv.appendChild(headerDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('comment-content');
    const formattedContent = formatContent(comment.message);
    contentDiv.appendChild(formattedContent);
    commentDiv.appendChild(contentDiv);

    const replyLinkDiv = document.createElement('div');
    replyLinkDiv.classList.add('reply-link');
    const replyLink = document.createElement('a');
    replyLink.href = '#';
    replyLink.textContent = i18n.reply;
    replyLink.onclick = (event) => {
       event.preventDefault();
       if (this._onReply) {
         this._onReply(comment.id);
       }
     };
    replyLinkDiv.appendChild(replyLink);
    commentDiv.appendChild(replyLinkDiv);

    if (children) {
       commentDiv.appendChild(children);
     }
    
    return commentDiv;
  }
}

// Define the custom element
customElements.define('comment-list', CommentList);

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CommentList;
}