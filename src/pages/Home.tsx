import React from 'react';

const Home: React.FC = () => {
  return (
    <main>
      <h1>Welcome to My Website</h1>
      <p>Hello! I'm a software developer.</p>
      <p>
        Check out my <a href="/about">About Me</a> page to learn more about me
        or view my{' '}
        <a href="/resume.pdf" target="_blank">
          resume
        </a>
        .
      </p>
    </main>
  );
};

export default Home;
