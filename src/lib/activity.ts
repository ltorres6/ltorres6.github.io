// Contribution history fetched at build time from public GitHub and GitLab
// calendars, so visitors' browsers never call either API. Any failure returns
// null and the page renders without the heatmap.
import { site } from '@/data/site';

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  github: number;
  gitlab: number;
}

const GITHUB_USER = new URL(site.links.github).pathname.slice(1);
const GITLAB_USER = new URL(site.links.gitlab).pathname.slice(1);

async function fetchText(url: string) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
    headers: { 'user-agent': 'luistorresphd.com build' },
  });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

async function githubDays(): Promise<Map<string, number>> {
  const html = await fetchText(
    `https://github.com/users/${GITHUB_USER}/contributions`,
  );
  const dateById = new Map<string, string>();
  for (const m of html.matchAll(
    /<td[^>]*?data-date="([\d-]+)"[^>]*?id="([^"]+)"/g,
  ))
    dateById.set(m[2], m[1]);
  const days = new Map<string, number>();
  for (const m of html.matchAll(
    /<tool-tip[^>]*?for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
  )) {
    const date = dateById.get(m[1]);
    if (!date) continue;
    const n = /^(\d+) contribution/.exec(m[2]);
    days.set(date, n ? Number(n[1]) : 0);
  }
  if (days.size === 0) throw new Error('GitHub calendar markup not recognized');
  return days;
}

async function gitlabDays(): Promise<Map<string, number>> {
  const json = JSON.parse(
    await fetchText(`https://gitlab.com/users/${GITLAB_USER}/calendar.json`),
  ) as Record<string, number>;
  return new Map(Object.entries(json));
}

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

let cached: Promise<ActivityDay[] | null> | undefined;

/** The last 53 weeks, ending today, starting on a Sunday. */
export function getActivity() {
  cached ??= (async () => {
    const [gh, gl] = await Promise.allSettled([githubDays(), gitlabDays()]);
    for (const [name, r] of [
      ['GitHub', gh],
      ['GitLab', gl],
    ] as const)
      if (r.status === 'rejected')
        console.warn(`[activity] ${name} skipped: ${r.reason}`);
    if (gh.status === 'rejected' && gl.status === 'rejected') return null;
    const ghDays = gh.status === 'fulfilled' ? gh.value : new Map();
    const glDays = gl.status === 'fulfilled' ? gl.value : new Map();

    const end = new Date();
    end.setUTCHours(0, 0, 0, 0);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 7 * 52 - end.getUTCDay());
    const days: ActivityDay[] = [];
    for (
      const d = new Date(start);
      d <= end;
      d.setUTCDate(d.getUTCDate() + 1)
    ) {
      const date = isoDate(d);
      days.push({
        date,
        github: ghDays.get(date) ?? 0,
        gitlab: glDays.get(date) ?? 0,
      });
    }
    return days;
  })();
  return cached;
}
