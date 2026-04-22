import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { PropsWithChildren } from 'react';

import { useAuthStore } from './store/useAuthStore';

import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import BookDetailPage from './pages/BookDetailPage';
import AdminCreateBookPage from './pages/AdminCreateBookPage';
import AdminEditBookPage from './pages/AdminEditBookPage';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create"
        element={
          <AdminRoute>
            <AdminCreateBookPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <AdminRoute>
            <AdminEditBookPage />
          </AdminRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to={user ? '/' : '/login'} replace />}
      />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <AppRoutes />
      </div>
    </Router>
  );
}