import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-photo">
          <img src="/assets/profile-photo.jpg" alt="Luis Torres, PhD" />
        </div>
        <h1>Luis Torres, PhD</h1>
        <p className="subtitle">Medical Physicist | Scientific Solutions Engineer</p>
        <div className="cta-buttons">
          <Link to="/resume">View Resume</Link>
          <Link to="/about" className="secondary">About Me</Link>
        </div>
      </section>
      <section className="highlights">
        <Link to="/education" className="highlight-link">
          <article className="highlight">
            <h2>Education</h2>
            <p>
              Explore my academic journey and the institutions where I've honed
              my expertise in medical physics.
            </p>
          </article>
        </Link>
        <Link to="/publications" className="highlight-link">
          <article className="highlight">
            <h2>Publications</h2>
            <p>
              Discover my research work and publications that contribute to
              advancements in medical imaging and diagnostics.
            </p>
          </article>
        </Link>
        <Link to="/about" className="highlight-link">
          <article className="highlight">
            <h2>About Me</h2>
            <p>
              Get to know more about my background, interests, and professional
              journey as a scientific solutions engineer. Contact information included.
            </p>
          </article>
        </Link>
        <Link to="/activity" className="highlight-link">
          <article className="highlight">
            <h2>Activity</h2>
            <p>View my development activity, contributions, and recent projects across GitHub and GitLab.</p>
          </article>
        </Link>
        <Link to="/resume" className="highlight-link">
          <article className="highlight">
            <h2>Resume</h2>
            <p>View my complete professional curriculum vitae and career history.</p>
          </article>
        </Link>
      </section>
    </main>
  );
};

export default Home;
