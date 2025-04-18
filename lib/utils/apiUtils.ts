/**
 * Utility functions for making authenticated API requests
 */

// The API key is stored in localStorage for client-side requests
// This is a simple approach for a single-user application
// For a multi-user app, you would use a more robust authentication system
const API_KEY_STORAGE_KEY = 'insight_ink_api_key';

/**
 * Set the API key in localStorage
 */
export function setApiKey(apiKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  }
}

/**
 * Get the API key from localStorage
 */
export function getApiKey(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  }
  return null;
}

/**
 * Clear the API key from localStorage
 */
export function clearApiKey(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

/**
 * Check if the API key is set
 */
export function hasApiKey(): boolean {
  return !!getApiKey();
}

/**
 * Get headers with the API key
 */
export function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const apiKey = getApiKey();
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }
  
  return headers;
}

/**
 * Make an authenticated fetch request
 */
export async function fetchWithAuth(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
}
