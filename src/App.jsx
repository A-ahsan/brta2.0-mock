import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, LanguageProvider } from './contexts/AppContext';
import Homepage from './pages/Homepage';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import PoliceDashboard from './pages/PoliceDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/police" element={<PoliceDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
