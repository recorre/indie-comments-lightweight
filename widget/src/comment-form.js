/**
 * CommentForm - Sub-component for submitting new comments
 * 
 * Features:
 * - Form validation
 * - Submission handling
 * - Loading states
 * - Error handling
 */

class CommentForm extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // State management
    this.state = {
      submitting: false,
      error: null,
      successMessage: null
    };
  }

  static get observedAttributes() {
    return ['thread-id', 'api-base-url', 'parent-id'];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'thread-id' || name === 'api-base-url' || name === 'parent-id') {
        // Re-render when attributes change
        this.render();
      }
    }
  }

  get threadId() {
    return this.getAttribute('thread-id');
  }

  get apiBaseUrl() {
    return this.getAttribute('api-base-url') || 'http://localhost:3001/api';
  }

  get parentId() {
    return this.getAttribute('parent-id');
  }

  render() {
    const html = `
      <style>
        :host {
          display: block;
        }
        
        .comment-form {
          background-color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
        
        .form-title {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .submit-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
        }
        
        .submit-btn:hover {
          background-color: #2563eb;
        }
        
        .submit-btn:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        
        .error {
          color: #dc2626;
          background-color: #fef2f2;
          padding: 0.5rem;
          border-radius: 0.375rem;
          margin: 0.5rem 0;
        }
        

        .loading {
          color: #374151;
          font-style: italic;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success {
          color: #16a34a;
          background-color: #f0fdf4;
          padding: 0.5rem;
          border-radius: 0.375rem;
          margin: 0.5rem 0;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .error {
          color: #dc2626;
          background-color: #fef2f2;
          padding: 0.5rem;
          border-radius: 0.375rem;
          margin: 0.5rem 0;
          border: 1px solid #fecaca;
          font-weight: 500;
        }
      </style>
      
      <div class="comment-form">
        <h4 class="form-title">${this.parentId ? `Replying to ${this.parentId}` : 'Add a Comment'}</h4>
        ${this.renderError()}
        ${this.renderSuccessMessage()}
        <form id="commentForm">
          <div class="form-group">
            <label for="authorName">Name *</label>
            <input type="text" id="authorName" name="authorName" required />
          </div>
          
          <div class="form-group">
            <label for="authorEmail">Email</label>
            <input type="email" id="authorEmail" name="authorEmail" />
          </div>
          
          <div class="form-group">
            <label for="authorWebsite">Website</label>
            <input type="url" id="authorWebsite" name="authorWebsite" />
          </div>
          
          <div class="form-group">
            <label for="commentMessage">Comment *</label>
            <textarea id="commentMessage" name="commentMessage" required></textarea>
          </div>
          
          <button type="submit" class="submit-btn" ${this.state.submitting ? 'disabled' : ''}>
            ${this.state.submitting ? '<div class="spinner"></div> Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    `;
    
    this.shadowRoot.innerHTML = html;
  }

  renderError() {
    if (!this.state.error) return '';
    return `<div class="error">${this.state.error}</div>`;
  }

  renderSuccessMessage() {
    if (!this.state.successMessage) return '';
    return `<div class="success">${this.state.successMessage}</div>`;
  }

  _updateStateAndRender(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  bindEvents() {
    const form = this.shadowRoot.getElementById('commentForm');
    if (form) {
      form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  /**
   * Validates the comment form data.
   * @param {Object} commentData - The comment data to validate.
   * @returns {string|null} Error message or null if valid.
   */
  validateForm(commentData) {
    if (!commentData.author_name.trim()) {
      return 'O nome é obrigatório.';
    }
    if (commentData.author_name.trim().length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres.';
    }
    if (!commentData.message.trim()) {
      return 'A mensagem do comentário é obrigatória.';
    }
    if (commentData.message.trim().length < 5) {
      return 'A mensagem deve ter pelo menos 5 caracteres.';
    }
    return null; // No errors
  }

  /**
   * Handles form submission, validates data, and sends the comment.
   * @param {Event} event - The submit event.
   */
  async handleSubmit(event) {
    event.preventDefault();

    if (this.state.submitting) return;

    const form = event.target;
    const formData = new FormData(form);

    const commentData = {
       thread_id: this.threadId,
       parent_id: this.parentId || null,
       author_name: formData.get('authorName'),
       author_email: formData.get('authorEmail') || null,
       author_website: formData.get('authorWebsite') || null,
       message: formData.get('commentMessage'),
       status: 'pending'
     };

    const validationError = this.validateForm(commentData);
    if (validationError) {
      this._updateStateAndRender({ error: validationError });
      return;
    }

    this._updateStateAndRender({ submitting: true, error: null });

    try {
      const response = await fetch(`${this.apiBaseUrl}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao enviar o comentário. Tente novamente.');
      }

      form.reset();
      this.setAttribute('parent-id', null);
      if (this.onCommentSubmitted) {
        this.onCommentSubmitted(result);
      }
      this._updateStateAndRender({ submitting: false, error: null, successMessage: '✅ Comentário enviado com sucesso!' });

      setTimeout(() => {
        this._updateStateAndRender({ successMessage: null });
      }, 3000);

    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
      let userFriendlyMessage = 'Ocorreu um erro de rede. Verifique sua conexão.';
      if (error.message.includes('Erro no servidor') || error.message.includes('Failed to create thread')) {
        userFriendlyMessage = 'Erro no servidor. Tente novamente mais tarde.';
      } else if (error.message.includes('Não foi possível conectar')) {
        userFriendlyMessage = 'Não foi possível conectar. Tente novamente em instantes.';
      }
      this._updateStateAndRender({
        submitting: false,
        error: userFriendlyMessage,
        successMessage: null
      });
    }
  }
}

// Define the custom element
customElements.define('comment-form', CommentForm);

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CommentForm;
}