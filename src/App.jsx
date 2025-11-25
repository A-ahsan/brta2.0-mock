import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, LanguageProvider, DownloadProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages to reduce initial bundle and upfront render work
const Homepage = lazy(() => import('./pages/Homepage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const PoliceDashboard = lazy(() => import('./pages/PoliceDashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const PoliceLogin = lazy(() => import('./pages/PoliceLogin'));
const FeatureDetail = lazy(() => import('./pages/FeatureDetail'));
const FeeCalculator = lazy(() => import('./pages/FeeCalculator'));
const Notices = lazy(() => import('./pages/Notices'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <DownloadProvider>
            <AuthProvider>
              <Router>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '14px',
                      fontWeight: '500',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-white to-muted dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/feature/:featureId" element={<FeatureDetail />} />
                  <Route path="/fee-calculator" element={<FeeCalculator />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/about" element={<AboutUs />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/police-login" element={<PoliceLogin />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['user']}>
                        <UserDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminPanel />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/police-dashboard/*" 
                    element={
                      <ProtectedRoute allowedRoles={['police']}>
                        <PoliceDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
            </Router>
          </AuthProvider>
          </DownloadProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
