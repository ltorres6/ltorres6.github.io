import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Developer from './pages/Projects';
import Resume from './pages/Resume';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
