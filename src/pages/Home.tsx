import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <h1>Welcome to luigibytes.com</h1>
        <p>{"Hi, I'm Luis Torres, a scientific solutions engineer."}</p>
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
              journey as a scientific solutions engineer.
            </p>
          </article>
        </Link>
        <Link to="/contact" className="highlight-link">
          <article className="highlight">
            <h2>Contact</h2>
            <p>
              Feel free to reach out to me for collaborations, inquiries, or
              just to connect.
            </p>
          </article>
        </Link>
        <Link to="/projects" className="highlight-link">
          <article className="highlight">
            <h2>Projects</h2>
            <p>Explore my projects and repositories.</p>
          </article>
        </Link>
        <Link to="/resume" className="highlight-link">
          <article className="highlight">
            <h2>Resume</h2>
            <p>Check out my resume if you want.</p>
          </article>
        </Link>
      </section>
    </main>
  );
};

export default Home;
