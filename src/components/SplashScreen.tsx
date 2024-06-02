// src/components/SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';

interface SplashScreenProps {
  isExiting: boolean;
  onClick: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isExiting, onClick }) => {
  const [showProceedMessage, setShowProceedMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProceedMessage(true);
    }, 2000); // Delay to show the proceed message after the main animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="splash-screen"
      className={`splash-screen ${isExiting ? 'exit' : ''}`}
      onClick={onClick}
    >
      <div className="splash-circle">
        <img src="/assets/pedro.webp" alt="Loading..." />
      </div>
      <div className="signature">
        <p>Luis Torres, PhD</p>
      </div>
      {showProceedMessage && (
        <div className="proceed-message">
          (Click to proceed)
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
