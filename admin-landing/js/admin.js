/**
 * Admin Dashboard JavaScript
 * Lightweight admin interface for comment moderation
 */

import { UI } from './ui.js';
import { Data } from './data.js';

// Initialize the page
function init() {
    UI.init();
    loadCommentsAndStats();
    
    // Set up event listeners
    if (UI.elements.statusFilter) UI.elements.statusFilter.addEventListener('change', loadCommentsAndStats);
    if (UI.elements.limitSelect) UI.elements.limitSelect.addEventListener('change', loadCommentsAndStats);
    if (UI.elements.refreshBtn) UI.elements.refreshBtn.addEventListener('click', loadCommentsAndStats);
    if (UI.elements.logoutBtn) UI.elements.logoutBtn.addEventListener('click', Data.logout);

    // Event delegation for moderation buttons
    if (UI.elements.commentsContainer) {
        UI.elements.commentsContainer.addEventListener('click', async (event) => {
            const target = event.target;
            if (target.classList.contains('btn-approve') || target.classList.contains('btn-reject') || target.classList.contains('btn-spam')) {
                const commentId = target.dataset.id;
                const newStatus = target.dataset.status;
                if (commentId && newStatus) {
                    const success = await Data.updateCommentStatus(commentId, newStatus);
                    if (success) {
                        await Data.logModerationAction(commentId, newStatus);
                        loadCommentsAndStats();
                    }
                }
            }
        });
    }
}

async function loadCommentsAndStats() {
    const status = UI.elements.statusFilter?.value;
    const limit = UI.elements.limitSelect?.value;
    await Data.loadComments(status, limit);
    await Data.loadStats();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);