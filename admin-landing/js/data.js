/**
 * Data Module for Admin Dashboard
 * Handles all data loading and API interactions.
 */

import { UI } from './ui.js';
import { i18n } from './i18n.js';

// Configuration (can be imported or passed)
const CONFIG = {
    API_BASE_URL: 'http://localhost:3001/api',
    ADMIN_API_KEY: localStorage.getItem('adminApiKey') || 'your-admin-key-here'
};

export const Data = {
    loadComments: async function(status, limit) {
        UI.showLoading();
        try {
            let url = `${CONFIG.API_BASE_URL}/admin/comments`;
            const params = [];
            
            if (status) params.push(`status=${status}`);
            if (limit) params.push(`limit=${limit}`);
            
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${CONFIG.ADMIN_API_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to load comments: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            UI.displayComments(data.data || []);
            UI.showMessage(i18n.commentsLoadedSuccessfully, 'success');
            return data.data || [];
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error loading comments:`, error);
            UI.showError(`${i18n.errorLoadingComments} ${error.message}`);
            UI.displayComments([]); // Clear comments on error
            return [];
        } finally {
            UI.hideLoading();
        }
    },

    loadStats: async function() {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/admin/comments?limit=100`, {
                headers: {
                    'Authorization': `Bearer ${CONFIG.ADMIN_API_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to load stats: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            const comments = data.data || [];
            
            const stats = comments.reduce((acc, comment) => {
                acc.total++;
                acc[comment.status] = (acc[comment.status] || 0) + 1;
                return acc;
            }, { total: 0, pending: 0, approved: 0, rejected: 0, spam: 0 });
            
            UI.updateStats(stats);
            UI.showMessage(i18n.statsLoadedSuccessfully, 'success');
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error loading stats:`, error);
            UI.showError(`${i18n.errorLoadingStats} ${error.message}`);
        }
    },

    updateCommentStatus: async function(commentId, newStatus) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/admin/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.ADMIN_API_KEY}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to update comment: ${response.status} ${response.statusText}`);
            }
            
            UI.showMessage(i18n.commentStatusUpdated.replace('{id}', commentId).replace('{status}', newStatus), 'success');
            return true;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating comment status:`, error);
            UI.showError(`${i18n.errorUpdatingComment} ${error.message}`);
            return false;
        }
    },

    logModerationAction: async function(commentId, action) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/admin/moderation-log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.ADMIN_API_KEY}`
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    moderator_id: 1, // In a real app, this would come from session
                    action: action,
                    reason: action // Could be expanded to include specific reasons
                })
            });
            
            if (!response.ok) {
                console.warn(`[${new Date().toISOString()}] Failed to log moderation action:`, response.status);
                UI.showError(`Failed to log moderation action for comment ${commentId}.`, 'warning');
            } else {
                UI.showMessage(i18n.moderationActionLogged.replace('{id}', commentId), 'success');
            }
        } catch (error) {
            console.warn(`[${new Date().toISOString()}] Error logging moderation action:`, error);
            UI.showError(`${i18n.errorLoggingModerationAction.replace('{id}', commentId)} ${error.message}`, 'warning');
        }
    },

    logout: function() {
        localStorage.removeItem('adminApiKey');
        window.location.href = '../';
    }
};