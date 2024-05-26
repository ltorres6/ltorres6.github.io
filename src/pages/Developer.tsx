import React from 'react';
import GitHubCalendarComponent from '../components/GitHubCalendarComponent';
import GitLabCalendarComponent from '../components/GitLabCalendarComponent';

const Developer = () => {
  const githubUsername = 'ltorres6';
  const gitlabUsername = 'luistorres2';

  return (
    <main className="center-content">
      <h1>Look at me go!</h1>
      <section>
        <h2>GitHub Contributions</h2>
        <GitHubCalendarComponent
          username={githubUsername}
          themeType="explicit"
        />
      </section>
      <section>
        <h2>GitLab Contributions</h2>
        <GitLabCalendarComponent
          username={gitlabUsername}
          themeType="explicit"
        />
      </section>
    </main>
  );
};

export default Developer;
