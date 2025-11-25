import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Authenticating...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to appropriate login page
  if (!user) {
    // Check which protected route they're trying to access
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin-login" replace />;
    } else if (location.pathname.startsWith('/police')) {
      return <Navigate to="/police-login" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // If user is logged in but doesn't have the right role
  if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.role)) {
    // Redirect to their appropriate dashboard
    if (profile?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (profile?.role === 'police') {
      return <Navigate to="/police-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
