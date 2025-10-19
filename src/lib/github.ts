export type GHRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
};

export async function getGitHubRepos(username: string, token?: string) {
  const headers: Record<string, string> = { 'Accept': 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `token ${token}`;
  // prefer provided username, otherwise fallback to env var
  username = username || process.env.GITHUB_USERNAME || '';
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers,
    next: { revalidate: 60 * 5 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} ${text}`);
  }

  const data: GHRepo[] = await res.json();
  return data.map((r) => ({
    id: `gh-${r.id}`,
    title: r.name,
    description: r.description || '',
    link: r.html_url,
    tech: r.language ? [r.language] : [],
  }));
}
