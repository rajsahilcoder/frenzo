import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Vision from './pages/Vision';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import ThankYou from './pages/ThankYou';
import ScrollToTop from './components/ui/ScrollToTop';

/* Auth Imports */
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

import AnalyticsTracker from './components/layout/AnalyticsTracker';
import Audit from './pages/Audit';

// Simple ScrollToTop component
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AuthProvider>
        <AnalyticsTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Public Services List */}
            <Route path="/services" element={<Services />} />
            
            {/* Protected Service Detail */}
            <Route path="/services/:id" element={
              <ProtectedRoute>
                <ServiceDetail />
              </ProtectedRoute>
            } />

            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Pricing */}
            <Route path="/pricing" element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            } />

            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/audit" element={<Audit />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* User Profile Route (Protected) */}
            <Route path="/profile/:userId" element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
