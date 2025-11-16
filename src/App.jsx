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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DownloadProvider>
          <Router>
            <Suspense fallback={<div aria-busy="true">Loading…</div>}>
              <Routes>
                <Route path="/" element={<Homepage />} />
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
