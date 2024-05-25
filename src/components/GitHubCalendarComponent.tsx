import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import '../styles/activity-calendar.css';
import { ThemeInput } from 'react-github-calendar';

const explicitTheme: ThemeInput = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
};

const minimalTheme: ThemeInput = {
    light: ['hsl(0, 0%, 92%)', 'rebeccapurple'],
    // for `dark` the default theme will be used
};

const GitHubCalendarComponent: React.FC<{ username: string; themeType: 'explicit' | 'minimal' }> = ({ username, themeType }) => {
    const theme = themeType === 'explicit' ? explicitTheme : minimalTheme;

    return (
        <div>
            <GitHubCalendar
                username={username}
                blockMargin={4}
                blockSize={12}
                fontSize={14}
                theme={theme}
                labels={{ totalCount: '{{count}} public contributions in the last year.' }}
            />
        </div>
    );
};

export default GitHubCalendarComponent;
