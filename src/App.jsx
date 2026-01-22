import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Vision from './pages/Vision';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import ScrollToTop from './components/ui/ScrollToTop';

// Simple ScrollToTop component
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }} basename="/frenzo">
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
