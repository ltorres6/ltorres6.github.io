import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Resume from './pages/Resume';
import Publications from './pages/Publications';
import Activity from './pages/Activity';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        {/* Redirect old /projects URL to /activity */}
        <Route path="/projects" element={<Navigate to="/activity" replace />} />
        <Route path="/education" element={<Education />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/publications" element={<Publications />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
