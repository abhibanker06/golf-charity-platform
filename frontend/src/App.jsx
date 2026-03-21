import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from './utils/axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Dashboard from './pages/Dashboard';
import Draws from './pages/Draws';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-slate-900 font-sans selection:bg-[#2a9d7b] selection:text-white flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/subscribe" element={<Subscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/draws" element={<Draws />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
