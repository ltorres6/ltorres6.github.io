import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <main>
      <h1>About Me</h1>
      <p>{`Hi! I'm Luis Torres, originally from New Mexico and now based in North Carolina. I work as a Scientific Solutions Engineer at Flywheel. I hold a PhD in Medical Physics from the University of Wisconsin - Madison, where I specialized in advanced MRI techniques for lung imaging.`}</p>
      <p>{`At Flywheel, I develop tools that streamline research processes and make scientific discoveries more efficient. In my free time, I stay connected to my New Mexican roots through cultural activities and trips back home.`}</p>
      <p>{`Feel free to reach out to discuss medical imaging, scientific computing, or collaboration opportunities.`}</p>

      <section className="contact-info">
        <h2>Contact</h2>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:luigibytes@gmail.com">luigibytes@gmail.com</a>
        </p>
      </section>
    </main>
  );
};

export default About;
