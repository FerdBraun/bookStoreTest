// @ts-ignore
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { BookOpen, LogOut, PlusCircle } from 'lucide-react';

const Header: React.FC = () => {
  // ✅ proper Zustand selectors
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = useAuthStore(
    (state) => state.user?.role === 'admin'
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary hover:text-blue-700 transition"
            >
              <BookOpen size={28} />
              <span className="text-xl font-bold tracking-tight">
                Books Shop
              </span>
            </Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center space-x-6">
            {/* ADMIN ACTION */}
            {isAdmin && (
              <Link
                to="/admin/create"
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-primary transition"
              >
                <PlusCircle size={18} />
                <span>Add Book</span>
              </Link>
            )}

            {/* USER INFO */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              <span className="text-sm text-gray-500">
                Hi,{' '}
                <span className="font-semibold text-gray-900">
                  {user?.login ?? 'Guest'}
                </span>
              </span>

              <button
                onClick={logout}
                className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;