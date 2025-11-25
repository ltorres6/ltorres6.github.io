import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// Lazy load heavy pages to improve initial load performance
const About = React.lazy(() => import('./pages/About'));
const Education = React.lazy(() => import('./pages/Education'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Publications = React.lazy(() => import('./pages/Publications'));
const Activity = React.lazy(() => import('./pages/Activity'));
const Recipes = React.lazy(() => import('./pages/Recipes'));
const RecipeDetail = React.lazy(() => import('./pages/RecipeDetail'));

// Loading component for lazy-loaded pages
const PageLoader: React.FC = () => (
  <main style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: 'var(--text-secondary)'
  }}>
    <div>Loading...</div>
  </main>
);

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activity" element={<Activity />} />
          {/* Redirect old /projects URL to /activity */}
          <Route path="/projects" element={<Navigate to="/activity" replace />} />
          <Route path="/education" element={<Education />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:slug" element={<RecipeDetail />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
