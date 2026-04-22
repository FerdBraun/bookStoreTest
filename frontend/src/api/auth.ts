import apiClient from './client';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  login: string;
  role: 'user' | 'admin';
  created_at: string;
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(
    '/auth/user',
    credentials
  );

  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};