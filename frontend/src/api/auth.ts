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

/**
 * Auth via cookie session (us)
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(
    '/api/auth/user',
    credentials
  );

  return data;
};