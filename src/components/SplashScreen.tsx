import React from 'react';
import '../styles/SplashScreen.css';

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-screen">
      <div className="environment"></div>
      <div className="hero-container">
        <h1 className="hero glitch layers" data-text="Luis Torres, PhD">
          Luis Torres, PhD
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
