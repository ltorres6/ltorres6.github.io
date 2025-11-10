import React from 'react';
import UnifiedCalendarComponent from '../components/UnifiedCalendarComponent';
import TopProjectsShowcase from '../components/TopProjectsShowcase';

const Activity = () => {
  const githubUsername = 'ltorres6';
  const gitlabUsername = 'luistorres2';

  // Optional: Manually specify which projects to showcase
  // Leave undefined to auto-select top 5 by recent activity
  const featuredProjects = undefined; // e.g., ['project1', 'project2', 'project3']

  return (
    <main className="center-content">
      <h1>Activity</h1>
      <p className="page-intro">
        A comprehensive view of my development activity and contributions across platforms.
      </p>

      <section>
        <h2>Contributions</h2>
        <UnifiedCalendarComponent
          githubUsername={githubUsername}
          gitlabUsername={gitlabUsername}
        />
      </section>

      <section>
        <h2>Recent Activity</h2>
        <TopProjectsShowcase
          githubUsername={githubUsername}
          gitlabUsername={gitlabUsername}
          projectNames={featuredProjects}
        />
      </section>
    </main>
  );
};

export default Activity;
