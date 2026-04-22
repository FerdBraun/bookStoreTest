// @ts-ignore
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { login as loginApi } from '../api/auth';
import { BookOpen, Loader2 } from 'lucide-react';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      const response = await loginApi({
        login,
        password,
      });

      // cookie-based auth (server sets `us`)
      setUser({
        login: response.login,
        role: response.role,
      });

      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            'Invalid login or password'
        );
      } else {
        setError('Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <BookOpen size={48} className="text-primary mb-4" />
          <h1 className="text-3xl font-bold text-center text-gray-900 tracking-tight">
            Books Shop
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* LOGIN */}
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Login
            </label>

            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setError('');
              }}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* DEMO BLOCK */}
        <div className="mt-6 text-sm text-center text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p>Demo Credentials:</p>
          <div className="flex justify-around mt-2">
            <div>
              <strong>User:</strong> user / user
            </div>
            <div>
              <strong>Admin:</strong> admin / admin
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;