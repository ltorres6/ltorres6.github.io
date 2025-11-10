import React, { useState, useEffect } from 'react';
import GitHubCalendar from 'react-github-calendar';
import '../styles/activity-calendar.css';
import { ThemeInput } from 'react-github-calendar';

// Session storage cache keys
const CACHE_KEY = 'unified_calendar_data';
const CACHE_TIMESTAMP_KEY = 'unified_calendar_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubData {
  total: { lastYear: number };
  contributions: Activity[];
}

interface GitLabEvent {
  created_at: string;
  action_name: string;
  target_type: string;
}

interface CachedData {
  unifiedData: Activity[];
  totalContributions: number;
}

// Professional Gold Gradient Theme - Dark Mode (Light to Dark = Less to More)
const explicitTheme: ThemeInput = {
  light: ['#768390', '#ddc488', '#c9a961', '#a68543', '#8f7139'],
  dark: ['#768390', '#ddc488', '#c9a961', '#a68543', '#8f7139'],
};

const fetchGitLabData = async (username: string, startDate: string, endDate: string): Promise<{ [date: string]: number }> => {
  const contributionsData: { [date: string]: number } = {};
  let page = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    const response = await fetch(
      `https://gitlab.com/api/v4/users/${username}/events?after=${startDate}&before=${endDate}&page=${page}&per_page=100`
    );
    
    if (!response.ok) {
      throw new Error(`GitLab API error: ${response.status}`);
    }

    const data: GitLabEvent[] = await response.json();
    
    if (data.length === 0) {
      hasMoreData = false;
    } else {
      data.forEach((event) => {
        const date = event.created_at.substring(0, 10);
        contributionsData[date] = (contributionsData[date] || 0) + 1;
      });
      page++;
    }
  }

  return contributionsData;
};

const UnifiedCalendarComponent: React.FC<{
  githubUsername: string;
  gitlabUsername: string;
}> = ({ githubUsername, gitlabUsername }) => {
  const [contributionCount, setContributionCount] = useState<number | null>(null);
  const [unifiedData, setUnifiedData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnifiedData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedTimestamp = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);
        const cachedData = sessionStorage.getItem(CACHE_KEY);

        if (cachedTimestamp && cachedData) {
          const timestamp = parseInt(cachedTimestamp, 10);
          const now = Date.now();

          // Use cache if it's still valid
          if (now - timestamp < CACHE_DURATION) {
            const parsed: CachedData = JSON.parse(cachedData);
            setUnifiedData(parsed.unifiedData);
            setContributionCount(parsed.totalContributions);
            setLoading(false);
            return;
          }
        }

        // Fetch GitHub data
        const githubResponse = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`
        );
        const githubData: GitHubData = await githubResponse.json();

        // Get date range from GitHub data
        const startDate = githubData.contributions[0].date;
        const endDate = githubData.contributions[githubData.contributions.length - 1].date;

        // Fetch GitLab data
        const gitlabContributions = await fetchGitLabData(gitlabUsername, startDate, endDate);

        // Merge the data
        const merged = githubData.contributions.map((day) => {
          const githubCount = day.count;
          const gitlabCount = gitlabContributions[day.date] || 0;
          const totalCount = githubCount + gitlabCount;

          // Calculate level (0-4)
          let level: 0 | 1 | 2 | 3 | 4;
          if (totalCount === 0) {
            level = 0;
          } else if (totalCount <= 3) {
            level = 1;
          } else if (totalCount <= 6) {
            level = 2;
          } else if (totalCount <= 9) {
            level = 3;
          } else {
            level = 4;
          }

          return {
            date: day.date,
            count: totalCount,
            level,
          };
        });

        const totalContributions = merged.reduce((sum, day) => sum + day.count, 0);

        // Cache the data
        const dataToCache: CachedData = {
          unifiedData: merged,
          totalContributions,
        };
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
        sessionStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

        setUnifiedData(merged);
        setContributionCount(totalContributions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching unified data:', err);
        setError('Failed to load contribution data');
        setLoading(false);
      }
    };

    fetchUnifiedData();
  }, [githubUsername, gitlabUsername]);

  if (loading) {
    return (
      <div className="calendar-wrapper">
        <div className="calendar-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading contributions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <p className="calendar-subtitle" style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        {contributionCount !== null && (
          <p className="calendar-subtitle">
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{contributionCount}</span> combined contributions in the last year
          </p>
        )}
        <div className="custom-legend">
          <span className="legend-label">Less</span>
          <div className="legend-colors">
            <span className="legend-box" style={{ backgroundColor: '#768390' }}></span>
            <span className="legend-box" style={{ backgroundColor: '#ddc488' }}></span>
            <span className="legend-box" style={{ backgroundColor: '#c9a961' }}></span>
            <span className="legend-box" style={{ backgroundColor: '#a68543' }}></span>
            <span className="legend-box" style={{ backgroundColor: '#8f7139' }}></span>
          </div>
          <span className="legend-label">More</span>
        </div>
      </div>
      <GitHubCalendar
        username={githubUsername}
        blockMargin={4}
        blockSize={14}
        fontSize={14}
        theme={explicitTheme}
        hideColorLegend={true}
        hideTotalCount={true}
        transformData={() => unifiedData || []}
      />
    </div>
  );
};

export default UnifiedCalendarComponent;

