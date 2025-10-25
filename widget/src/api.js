/**
 * API module for interacting with the Indie Comments backend.
 */

import i18n from './i18n.js';
import { fetchWithRetry, handleApiError } from './utils.js';

/**
 * Creates a new thread for a given page.
 * @param {string} apiBaseUrl - The base URL of the API.
 * @param {object} threadData - Data for the new thread (site_id, page_url, page_title).
 * @returns {Promise<object>} The created thread data.
 */
export async function createThread(apiBaseUrl, threadData) {
  try {
    const response = await fetchWithRetry(`${apiBaseUrl}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(threadData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create thread: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error creating thread:`, error);
    throw handleApiError(error, i18n);
  }
}

/**
 * Fetches comments for a specific thread.
 * @param {string} apiBaseUrl - The base URL of the API.
 *
@param {string} threadId - The ID of the thread to fetch comments for.
 * @returns {Promise<Array>} A list of comments.
 */
export async function fetchComments(apiBaseUrl, threadId) {
  try {
    const response = await fetchWithRetry(`${apiBaseUrl}/comments?thread_id=${threadId}&status=approved`);

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching comments:`, error);
    throw handleApiError(error, i18n);
  }
}

/**
 * Fetches all threads for a specific site.
 * @param {string} apiBaseUrl - The base URL of the API.
 * @param {number} siteId - The ID of the site.
 * @returns {Promise<Array>} A list of threads.
 */
export async function fetchThreads(apiBaseUrl, siteId) {
  try {
    const response = await fetchWithRetry(`${apiBaseUrl}/threads?site_id=${siteId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch threads: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching threads:`, error);
    throw handleApiError(error, i18n);
  }
}