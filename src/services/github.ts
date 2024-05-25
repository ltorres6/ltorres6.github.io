const GITHUB_USERNAME = 'ltorres6';

export const fetchGitHubRepos = async () => {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    if (!response.ok) {
        throw new Error('Failed to fetch GitHub repos');
    }
    return response.json();
};
