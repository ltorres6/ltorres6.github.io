import React, { useState, useEffect } from 'react';
import '../styles/top-projects.css';

// Session storage cache keys
const PROJECTS_CACHE_KEY = 'top_projects_data';
const PROJECTS_CACHE_TIMESTAMP_KEY = 'top_projects_timestamp';
const PROJECTS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

interface Repository {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  updated_at: string;
  pushed_at: string; // Actual code activity date
  source: 'github' | 'gitlab';
}

const TopProjectsShowcase: React.FC<{
  githubUsername: string;
  gitlabUsername: string;
  projectNames?: string[]; // Optional: manually specify which projects to show
}> = ({ githubUsername, gitlabUsername, projectNames }) => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedTimestamp = sessionStorage.getItem(PROJECTS_CACHE_TIMESTAMP_KEY);
        const cachedData = sessionStorage.getItem(PROJECTS_CACHE_KEY);

        if (cachedTimestamp && cachedData) {
          const timestamp = parseInt(cachedTimestamp, 10);
          const now = Date.now();

          // Use cache if it's still valid
          if (now - timestamp < PROJECTS_CACHE_DURATION) {
            const parsed: Repository[] = JSON.parse(cachedData);
            setProjects(parsed);
            setLoading(false);
            return;
          }
        }

        // Fetch GitHub repositories (sorted by pushed_at for actual code activity)
        const githubResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=50`
        );

        if (!githubResponse.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }

        const githubRepos = await githubResponse.json();

        // Transform GitHub repos to common format
        const githubProjects: Repository[] = githubRepos
          .filter((repo: any) => !repo.fork && !repo.private)
          .map((repo: any) => ({
            id: `github-${repo.id}`,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            fork: repo.fork,
            updated_at: repo.updated_at,
            pushed_at: repo.pushed_at, // Use pushed_at for sorting
            source: 'github' as const,
          }));

        // Fetch GitLab projects from user's events (to get projects they contribute to)
        // First, get the user ID
        const gitlabUserResponse = await fetch(
          `https://gitlab.com/api/v4/users?username=${gitlabUsername}`
        );

        let gitlabProjects: Repository[] = [];

        if (gitlabUserResponse.ok) {
          const users = await gitlabUserResponse.json();
          if (users.length > 0) {
            const userId = users[0].id;

            // Fetch user's events to find projects they contribute to
            const eventsResponse = await fetch(
              `https://gitlab.com/api/v4/users/${userId}/events?per_page=100`
            );

            if (eventsResponse.ok) {
              const events = await eventsResponse.json();

              // Filter for push events only (actual code pushes)
              const pushEvents = events.filter((e: any) =>
                e.action_name === 'pushed to' ||
                e.action_name === 'pushed new'
              );

              // Extract unique project IDs from push events
              const projectIds = [...new Set(pushEvents.map((e: any) => e.project_id).filter((id: any) => id))];

              // Fetch details for each project
              const projectPromises = projectIds.map((id: any) =>
                fetch(`https://gitlab.com/api/v4/projects/${id}`)
                  .then(res => res.ok ? res.json() : null)
                  .catch(() => null)
              );

              const projectDetails = await Promise.all(projectPromises);

              // Transform GitLab projects to common format
              gitlabProjects = projectDetails
                .filter((repo: any) => repo !== null && repo.visibility === 'public')
                .map((repo: any) => ({
                  id: `gitlab-${repo.id}`,
                  name: repo.name,
                  description: repo.description,
                  html_url: repo.web_url,
                  stargazers_count: repo.star_count || 0,
                  forks_count: repo.forks_count || 0,
                  language: repo.language || null,
                  topics: repo.topics || repo.tag_list || [],
                  fork: repo.forked_from_project !== undefined,
                  updated_at: repo.last_activity_at,
                  pushed_at: repo.last_activity_at, // Use last_activity_at for sorting
                  source: 'gitlab' as const,
                }));
            }
          }
        }

        // Combine and sort by most recent code activity (pushed_at)
        const allProjects = [...githubProjects, ...gitlabProjects]
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 5);

        // Cache the data
        sessionStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(allProjects));
        sessionStorage.setItem(PROJECTS_CACHE_TIMESTAMP_KEY, Date.now().toString());

        setProjects(allProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [githubUsername, gitlabUsername]);

  if (loading) {
    return (
      <div className="top-projects-loading">
        <div className="loading-spinner-small"></div>
        <p>Loading top projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="top-projects-error">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="top-projects-empty">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <div className="top-projects-container">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`project-card project-card-${project.source}`}
        >
          <div className="project-header">
            <div className="project-title-row">
              <h3 className="project-name">{project.name}</h3>
              <span className={`source-badge source-${project.source}`}>
                {project.source === 'github' ? 'GitHub' : 'GitLab'}
              </span>
            </div>
            <div className="project-stats">
              {project.stargazers_count > 0 && (
                <span className="stat">
                  <span className="stat-icon">⭐</span>
                  {project.stargazers_count}
                </span>
              )}
              {project.forks_count > 0 && (
                <span className="stat">
                  <span className="stat-icon">🔱</span>
                  {project.forks_count}
                </span>
              )}
            </div>
          </div>

          {project.description && (
            <p className="project-description">{project.description}</p>
          )}

          <div className="project-footer">
            {project.language && (
              <span className="project-language">
                <span className="language-dot"></span>
                {project.language}
              </span>
            )}
            {project.topics && project.topics.length > 0 && (
              <div className="project-topics">
                {project.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default TopProjectsShowcase;

