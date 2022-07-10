import apiClient from './clientApi';

export async function logoutCurrentUser() {
  const response = await apiClient.delete('/api/auth/logout', {
    withCredentials: true,
  });

  return response.data;
}

export async function getSessionStatus() {
  const response = await apiClient.get('/api/auth/session', {
    withCredentials: true,
  });

  return response.data;
}
