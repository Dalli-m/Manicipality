import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import NewsPage from './components/NewsPage';
import EventsPage from './components/EventsPage';
import ReportIssue from './components/ReportIssue';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';




function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
        
        
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;