import apiClient from './clientApi';
import { SanitizedUser } from '../interface';

export async function getCurrentUser(): Promise<SanitizedUser> {
  const response = await apiClient.get('/api/user/getuser', {
    withCredentials: true,
  });

  return response.data;
}

export async function getRandomUser(): Promise<SanitizedUser> {
  const response = await apiClient.get('/user/getrandomuser');

  return response.data;
}
