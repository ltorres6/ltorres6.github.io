import React, { useState } from 'react';
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
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  const handleSplashClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSplashVisible(false);
    }, 1000); // Duration of the exit animation
  };

  return (
    <>
      {splashVisible && (
        <SplashScreen isExiting={isExiting} onClick={handleSplashClick} />
      )}
      {!splashVisible && (
        <>
          {location.pathname !== '/' && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
