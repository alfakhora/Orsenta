import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Specialties from './components/Specialties';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Import Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorRegister from './pages/DoctorRegister';
import Dashboard from './pages/Dashboard';

const LandingPage = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    <Stats />
    <Specialties />
    <HowItWorks />
    <Features />
    <CTA />
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-doctor" element={<DoctorRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
