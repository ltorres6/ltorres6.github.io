const GITLAB_USERNAME = 'luistorres2';

export const fetchGitLabRepos = async () => {
    const response = await fetch(`https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects`);
    if (!response.ok) {
        throw new Error('Failed to fetch GitLab repos');
    }
    return response.json();
};
