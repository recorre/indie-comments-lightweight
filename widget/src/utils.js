import DOMPurify from '../node_modules/dompurify/dist/purify.es.mjs';

/**
 * Retrieves cached comments from localStorage if they are not expired.
 * @returns {Array|null} Cached comments or null if expired or not found.
 */
export function getCachedComments() {
  const cachedData = localStorage.getItem('indie_comments_cache');
  if (!cachedData) {
    return null;
  }

  const { timestamp, comments } = JSON.parse(cachedData);
  const oneMinute = 60 * 1000; // 1 minute in milliseconds

  if (Date.now() - timestamp < oneMinute) {
    return comments;
  } else {
    localStorage.removeItem('indie_comments_cache'); // Cache expired
    return null;
  }
}

/**
 * Stores comments in localStorage with a timestamp.
 * @param {Array} comments - The comments array to cache.
 */
export function setCachedComments(comments) {
  const dataToCache = {
    timestamp: Date.now(),
    comments: comments
  };
  localStorage.setItem('indie_comments_cache', JSON.stringify(dataToCache));
}

// Format content - convert markdown to HTML with safety measures
export function formatContent(content) {
  if (typeof content !== 'string') return '';
  
  // Basic markdown conversion with XSS prevention
  let html = content;
  
  // Convert headers (# Header)
  html = html.replace(/^# (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h5>$1</h5>');
  
  // Convert bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Convert italic (*text* or _text_)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  
  // Convert inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert code blocks ```code```
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Convert unordered lists
  html = html.replace(/^\s*\*\s(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  
  // Convert line breaks
  html = html.replace(/\n/g, '<br>');
  
  // Sanitize HTML to prevent XSS using DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  
  // Create a new DocumentFragment to hold the processed content
  const contentFragment = document.createDocumentFragment();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHtml;
  
  while (tempDiv.firstChild) {
    contentFragment.appendChild(tempDiv.firstChild);
  }
  
  return contentFragment;
}

/**
 * Retries a fetch request in case of network errors or server errors (status >= 500).
 * @param {string} url - The URL to fetch.
 * @param {object} options - The fetch options.
 * @param {number} retries - The number of retries.
 * @returns {Promise<Response>} The fetch response.
 * @throws {Error} If the request fails after all retries.
 */
export async function fetchWithRetry(url, options, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) {
        return response;
      }
      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      if (i === retries) {
        throw error;
      }
      console.warn(`Fetch failed, retrying in 1 second... (Attempt ${i + 1}/${retries + 1})`, error);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

/**
 * Handles API errors and translates them to user-friendly messages.
 * @param {Error} error - The error object.
 * @param {object} i18n - The internationalization object.
 * @returns {Error} A new error with a user-friendly message.
 */
export function handleApiError(error, i18n) {
  if (error.message.startsWith('Server error') || error.message.startsWith('Failed to')) {
    return new Error(i18n.serverError);
  } else {
    return new Error(i18n.connectionError);
  }
}

/**
 * Downloads a JSON object as a file.
 * @param {object} data - The data to download.
 * @param {string} filename - The filename.
 */
export function downloadJSON(data, filename) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Provides demo data for comments.
 * @param {string} threadId - The thread ID to get demo data for.
 * @returns {Array|null} Demo comments array or null if not found.
 */
export function getDemoData(threadId) {
  const demoData = {
    'demo-article-1': [
      {
        id: 1,
        thread_id: 'demo-article-1',
        author_name: 'Ana Silva',
        author_email: 'ana@example.com',
        message: 'Excelente artigo! Muito útil para quem está começando com blogs estáticos. Obrigada pelas dicas sobre Eleventy.',
        message_html: 'Excelente artigo! Muito útil para quem está começando com blogs estáticos. Obrigada pelas dicas sobre Eleventy.',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 2,
        thread_id: 'demo-article-1',
        author_name: 'Carlos Santos',
        author_email: 'carlos@example.com',
        message: 'Também gosto muito do Hugo. Ele tem uma comunidade muito ativa e muitos temas disponíveis. Qual a sua opinião sobre performance entre os dois?',
        message_html: 'Também gosto muito do Hugo. Ele tem uma comunidade muito ativa e muitos temas disponíveis. Qual a sua opinião sobre performance entre os dois?',
        status: 'approved',
        created_at: new Date(Date.now() - 43200000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 3,
        thread_id: 'demo-article-1',
        author_name: 'Ana Silva',
        author_email: 'ana@example.com',
        message: 'Oi Carlos! Concordo que Hugo tem uma comunidade incrível. Sobre performance, ambos são muito rápidos, mas Hugo geralmente ganha uma pequena vantagem em sites maiores devido ao Go.',
        message_html: 'Oi Carlos! Concordo que Hugo tem uma comunidade incrível. Sobre performance, ambos são muito rápidos, mas Hugo geralmente ganha uma pequena vantagem em sites maiores devido ao Go.',
        status: 'approved',
        created_at: new Date(Date.now() - 21600000).toISOString(),
        parent_id: 2,
        replies: []
      }
    ],
    'demo-article-2': [
      {
        id: 4,
        thread_id: 'demo-article-2',
        author_name: 'Marina Costa',
        author_email: 'marina@example.com',
        message: '**Performance** e **acessibilidade** são fundamentais no desenvolvimento web moderno. Gostei especialmente das dicas sobre Core Web Vitals.',
        message_html: '<strong>Performance</strong> e <strong>acessibilidade</strong> são fundamentais no desenvolvimento web moderno. Gostei especialmente das dicas sobre Core Web Vitals.',
        status: 'approved',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 5,
        thread_id: 'demo-article-2',
        author_name: 'Roberto Lima',
        author_email: 'roberto@example.com',
        message: 'E sobre PWAs? O artigo menciona alguma estratégia para progressive web apps?',
        message_html: 'E sobre PWAs? O artigo menciona alguma estratégia para progressive web apps?',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        parent_id: 0,
        replies: []
      }
    ],
    'demo-article-3': [
      {
        id: 6,
        thread_id: 'demo-article-3',
        author_name: 'Lucas Pereira',
        author_email: 'lucas@example.com',
        message: 'Privacidade é um direito fundamental. Ótimo artigo sobre como proteger dados pessoais online. Alguma dica específica para desenvolvedores?',
        message_html: 'Privacidade é um direito fundamental. Ótimo artigo sobre como proteger dados pessoais online. Alguma dica específica para desenvolvedores?',
        status: 'approved',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 7,
        thread_id: 'demo-article-3',
        author_name: 'Fernanda Oliveira',
        author_email: 'fernanda@example.com',
        message: 'Para desenvolvedores: sempre use HTTPS, implemente Content Security Policy (CSP), e evite armazenar dados sensíveis desnecessariamente. Também considere usar ferramentas como Privacy Badger.',
        message_html: 'Para desenvolvedores: sempre use HTTPS, implemente Content Security Policy (CSP), e evite armazenar dados sensíveis desnecessariamente. Também considere usar ferramentas como Privacy Badger.',
        status: 'approved',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        parent_id: 6,
        replies: []
      },
      {
        id: 8,
        thread_id: 'demo-article-3',
        author_name: 'Lucas Pereira',
        author_email: 'lucas@example.com',
        message: 'Obrigado pelas dicas! Vou implementar CSP no meu próximo projeto.',
        message_html: 'Obrigado pelas dicas! Vou implementar CSP no meu próximo projeto.',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        parent_id: 7,
        replies: []
      }
    ],
    'demo-article-4': [
      {
        id: 9,
        thread_id: 'demo-article-4',
        author_name: 'Beatriz Santos',
        author_email: 'beatriz@example.com',
        message: 'Adorei este artigo sobre criatividade na web! 🌈 É tão importante pensar fora da caixa nos dias de hoje. Qual ferramenta vocês recomendam para designs únicos?',
        message_html: 'Adorei este artigo sobre criatividade na web! 🌈 É tão importante pensar fora da caixa nos dias de hoje. Qual ferramenta vocês recomendam para designs únicos?',
        status: 'approved',
        created_at: new Date(Date.now() - 345600000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 10,
        thread_id: 'demo-article-4',
        author_name: 'Ricardo Mendes',
        author_email: 'ricardo@example.com',
        message: 'Para designs criativos, o **Figma** é incrível! Ele permite criar protótipos interativos e tem uma comunidade enorme de designers compartilhando recursos. Também gosto do **Blender** para elementos 3D.',
        message_html: 'Para designs criativos, o <strong>Figma</strong> é incrível! Ele permite criar protótipos interativos e tem uma comunidade enorme de designers compartilhando recursos. Também gosto do <strong>Blender</strong> para elementos 3D.',
        status: 'approved',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        parent_id: 9,
        replies: []
      },
      {
        id: 11,
        thread_id: 'demo-article-4',
        author_name: 'Carla Nunes',
        author_email: 'carla@example.com',
        message: 'Não esqueçam do CSS! Com as novas propriedades como `backdrop-filter` e gradientes complexos, é possível criar efeitos visuais incríveis só com código. ✨',
        message_html: 'Não esqueçam do CSS! Com as novas propriedades como <code>backdrop-filter</code> e gradientes complexos, é possível criar efeitos visuais incríveis só com código. ✨',
        status: 'approved',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        parent_id: 0,
        replies: []
      },
      {
        id: 12,
        thread_id: 'demo-article-4',
        author_name: 'Beatriz Santos',
        author_email: 'beatriz@example.com',
        message: 'Verdade! CSS moderno é uma ferramenta poderosa. Já experimentaram animações com `@keyframes`? Elas podem transformar completamente a experiência do usuário.',
        message_html: 'Verdade! CSS moderno é uma ferramenta poderosa. Já experimentaram animações com <code>@keyframes</code>? Elas podem transformar completamente a experiência do usuário.',
        status: 'approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        parent_id: 11,
        replies: []
      }
    ]
  };
  return demoData[threadId] || null;
}

/**
 * Provides demo page titles for threads.
 * @param {string} threadId - The thread ID.
 * @returns {string} The page title.
 */
export function getDemoPageTitle(threadId) {
  const titles = {
    'demo-article-1': 'Como Criar um Blog Estático',
    'demo-article-2': 'Desenvolvimento Web Moderno',
    'demo-article-3': 'Privacidade na Era Digital',
    'demo-article-4': 'Criatividade na Web'
  };
  return titles[threadId] || 'Demo Page';
}

// Format date to a readable format
export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if invalid

  // Format as "Month Day, Year" or "Today", "Yesterday" for recent dates
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays === 0) {
    return 'Today';
  }

  // Format the date as "Month Day, Year"
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}