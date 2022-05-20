import apiClient from './clientApi';

export async function logoutCurrentUser() {
  const response = await apiClient.delete('/api/auth/logout', {
    withCredentials: true,
  });

  return response.data;
}
