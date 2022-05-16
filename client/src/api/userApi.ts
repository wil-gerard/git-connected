import apiClient from './clientApi';
import { SanitizedUser } from '../interface';

export async function getCurrentUser(): Promise<SanitizedUser> {
  const response = await apiClient.get('/user/getuser');

  return response.data;
}

export async function getRandomUser(): Promise<SanitizedUser> {
  const response = await apiClient.get('/user/getuser');

  return response.data;
}
