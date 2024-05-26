import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Calendar, { Skeleton } from 'react-activity-calendar';
import '../styles/activity-calendar.css'; // Import custom CSS for styling

interface Activity {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  contributions: Activity[];
  total: { [year: string]: number };
}

interface Props {
  username: string;
  errorMessage?: string;
  themeType: 'explicit' | 'minimal';
  throwOnError?: boolean;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
  labels?: Record<string, string>;
}

const fetchCalendarData = async (
  username: string,
  lastYearISO: string,
  todayISO: string,
  page: number,
): Promise<any> => {
  const response = await fetch(
    `https://gitlab.com/api/v4/users/${username}/events?after=${lastYearISO}&before=${todayISO}&page=${page}&per_page=100`,
  );
  if (!response.ok) {
    const data = await response.json();
    throw Error(
      `Fetching GitLab contribution data for "${username}" failed: ${data.message}`,
    );
  }
  return response.json();
};

const fetchAllData = async (username: string): Promise<ApiResponse> => {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setDate(today.getDate() - 365); // Calculate 365 days ago
  const lastYearISO = lastYear.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  const todayISO = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD

  let page = 1;
  let contributionsData: { [date: string]: number } = {};
  let hasMoreData = true;

  while (hasMoreData) {
    const data = await fetchCalendarData(username, lastYearISO, todayISO, page);
    if (data.length === 0) {
      hasMoreData = false;
    } else {
      data.forEach((event: any) => {
        const date = event.created_at.substring(0, 10);
        contributionsData[date] = (contributionsData[date] || 0) + 1;
      });
      page++;
    }
  }

  const contributions: Activity[] = Object.entries(contributionsData).map(
    ([date, count]) => ({
      date,
      count,
      level: Math.min(4, Math.floor(count / 5)),
    }),
  );

  return {
    contributions,
    total: { last: contributions.reduce((acc, { count }) => acc + count, 0) },
  };
};

const cacheData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = (key: string): any => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

const explicitTheme = {
  light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
  dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
};

const minimalTheme = {
  light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
};

const GitLabCalendarComponent: FunctionComponent<Props> = ({
  username,
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitLab contribution data for "${username}" failed.`,
  themeType,
  ...props
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cacheKey = `gitlab-contributions-${username}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    try {
      const fetchedData = await fetchAllData(username);
      setData(fetchedData);
      cacheData(cacheKey, fetchedData);
    } catch (err: unknown) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    if (throwOnError) {
      throw error;
    } else {
      return <div>{errorMessage}</div>;
    }
  }

  if (loading || !data) {
    return <Skeleton {...props} loading />;
  }

  const theme = themeType === 'explicit' ? explicitTheme : minimalTheme;

  const defaultLabels = {
    totalCount: `{{count}} public contributions in the last year`,
  };

  const totalCount = data.total['last'];

  return (
    <div>
      <Calendar
        data={
          transformFn ? transformFn(data.contributions) : data.contributions
        }
        theme={theme}
        labels={Object.assign({}, defaultLabels, labels)}
        totalCount={transformFn && transformTotalCount ? undefined : totalCount}
        {...props}
        maxLevel={4}
        blockMargin={4}
        blockSize={12}
        fontSize={14}
      />
    </div>
  );
};

export default GitLabCalendarComponent;
