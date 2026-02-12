const API_BASE = 'https://mallmark-backend.onrender.com/api';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = localStorage.getItem('mallmark_token');
    if (!token) {
      window.location.href = '/login';
      throw new Error('No authentication token');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('mallmark_token');
    localStorage.removeItem('mallmark_user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function login(identifier: string, password: string) {
  const data = await apiFetch<{
    user: { id: string; name: string; email: string; isAdmin: boolean };
    token: string;
  }>('/customer/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
    skipAuth: true,
  });

  if (!data.user.isAdmin) {
    throw new Error('Access denied. Admin privileges required.');
  }

  localStorage.setItem('mallmark_token', data.token);
  localStorage.setItem('mallmark_user', JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem('mallmark_token');
  localStorage.removeItem('mallmark_user');
  window.location.href = '/login';
}

export function getUser() {
  const user = localStorage.getItem('mallmark_user');
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem('mallmark_token');
}
