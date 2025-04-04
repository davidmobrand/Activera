import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Configure DOMPurify
const config = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'strong', 'em', 'i', 'b',
    'a', 'img',
    'blockquote',
    'code', 'pre',
    'div', 'span',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'audio', 'source'
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel',
    'src', 'alt', 'title',
    'class', 'id',
    'width', 'height',
    'controls'
  ],
  ALLOW_DATA_ATTR: false,
  ADD_TAGS: ['audio', 'source'],
  ADD_ATTR: ['controls']
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  return purify.sanitize(html, config);
};

/**
 * Sanitizes a string for use in URLs
 */
export const sanitizeUrlParam = (param: string): string => {
  return encodeURIComponent(param.trim().toLowerCase());
};

/**
 * Sanitizes user input for use in database queries
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validates and sanitizes an email address
 */
export const sanitizeEmail = (email: string): string => {
  const sanitized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  return sanitized;
};

/**
 * Sanitizes a filename
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .trim()
    .replace(/[^a-zA-Z0-9-_\.]/g, '-')
    .replace(/\.{2,}/g, '.')
    .replace(/^-+|-+$/g, '');
};

/**
 * Sanitizes content for use in markdown
 */
export const sanitizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/[<>]/g, '')
    .replace(/^#/gm, '\\#')
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, (_, text, url) => {
      const sanitizedUrl = sanitizeUrlParam(url);
      return `[${text}](${sanitizedUrl})`;
    });
}; 