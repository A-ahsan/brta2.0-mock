import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, LanguageProvider, DownloadProvider } from './contexts/AppContext';

// Lazy-loaded pages to reduce initial bundle and upfront render work
const Homepage = lazy(() => import('./pages/Homepage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const PoliceDashboard = lazy(() => import('./pages/PoliceDashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const FeatureDetail = lazy(() => import('./pages/FeatureDetail'));

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DownloadProvider>
          <Router>
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
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                <Route path="/police/*" element={<PoliceDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Suspense>
          </Router>
        </DownloadProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
