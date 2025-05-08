export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
export const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL || 'http://localhost:8000';
// Example usage:
// fetch(`${API_BASE_URL}/login`, { ... })
// fetch(`${API_BASE_URL}/register`, { ... }) 