/**
 * UI Module for Admin Dashboard
 * Handles DOM manipulation, loading states, and user feedback messages.
 */

import { i18n } from './i18n.js';

export const UI = {
    elements: {
        commentsContainer: document.getElementById('commentsContainer'),
        loadingMessage: document.getElementById('loadingMessage'),
        statusFilter: document.getElementById('statusFilter'),
        limitSelect: document.getElementById('limitSelect'),
        refreshBtn: document.getElementById('refreshBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        pendingCount: document.getElementById('pendingCount'),
        approvedCount: document.getElementById('approvedCount'),
        spamCount: document.getElementById('spamCount'),
        totalComments: document.getElementById('totalComments'),
        messageContainer: document.getElementById('messageContainer') // Assuming a container for messages
    },

    init: function() {
        // Create a message container if it doesn't exist
        if (!this.elements.messageContainer) {
            const container = document.createElement('div');
            container.id = 'messageContainer';
            const mainElement = document.querySelector('main'); // Or any suitable parent element
            if (mainElement) {
                mainElement.prepend(container);
                this.elements.messageContainer = container;
            } else {
                document.body.prepend(container);
                this.elements.messageContainer = container;
            }
        }
    },

    showLoading: function() {
        if (this.elements.loadingMessage) {
            this.elements.loadingMessage.style.display = 'block';
        }
    },

    hideLoading: function() {
        if (this.elements.loadingMessage) {
            this.elements.loadingMessage.style.display = 'none';
        }
    },

    displayComments: function(comments) {
        if (!this.elements.commentsContainer) return;

        if (!comments || comments.length === 0) {
            this.elements.commentsContainer.innerHTML = `<p>${i18n.noCommentsFound}</p>`;
            return;
        }

        const commentsHtml = comments.map(comment => {
            const statusClass = comment.status || 'pending';
            const formattedDate = this.formatDate(comment.created_at);
            const threadUrl = `${window.location.origin}/thread/${comment.thread_id}`;
            
            return `
                <div class="comment-card ${statusClass}" data-comment-id="${comment.id}">
                    <div class="comment-header">
                        <div>
                            <div class="comment-author">${this.escapeHtml(comment.author_name)}</div>
                            <div>${this.escapeHtml(comment.author_email || '')}</div>
                            <div class="comment-date">${formattedDate}</div>
                        </div>
                        <span class="status-badge status-${comment.status}">${comment.status}</span>
                    </div>
                    <div class="comment-content">${this.formatContent(comment.message)}</div>
                    <div class="comment-actions">
                        <button class="btn btn-sm btn-approve" data-id="${comment.id}" data-status="approved">${i18n.approve}</button>
                        <button class="btn btn-sm btn-reject" data-id="${comment.id}" data-status="rejected">${i18n.reject}</button>
                        <button class="btn btn-sm btn-spam" data-id="${comment.id}" data-status="spam">${i18n.markAsSpam}</button>
                        ${comment.status === 'pending' ?
                            `<a class="btn btn-sm" href="${threadUrl}" target="_blank">${i18n.viewThread}</a>` :
                            ''}
                    </div>
                </div>
            `;
        }).join('');
        
        this.elements.commentsContainer.innerHTML = commentsHtml;
    },

    updateStats: function(stats) {
        if (this.elements.pendingCount) this.elements.pendingCount.textContent = stats.pending;
        if (this.elements.approvedCount) this.elements.approvedCount.textContent = stats.approved;
        if (this.elements.spamCount) this.elements.spamCount.textContent = stats.spam;
        if (this.elements.totalComments) this.elements.totalComments.textContent = stats.total;
    },

    showMessage: function(message, type = 'success') {
        if (!this.elements.messageContainer) return;

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        this.elements.messageContainer.prepend(alertDiv);

        // Automatically remove message after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },

    showError: function(message) {
        this.showMessage(message, 'error');
    },

    // Helper function to format date
    formatDate: function(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleString();
    },

    // Helper function to escape HTML
    escapeHtml: function(text) {
        if (typeof text !== 'string') return '';
        return text
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, '&#039;');
    },

    // Helper function to format content (basic markdown support)
    formatContent: function(content) {
        if (typeof content !== 'string') return '';
        
        // Basic markdown conversion with XSS prevention
        let html = content;
        
        // Convert newlines to <br>
        html = html.replace(/\n/g, '<br>');
        
        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
        
        // Convert italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');
        
        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // Convert inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Sanitize HTML to prevent XSS (basic implementation)
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    }
};