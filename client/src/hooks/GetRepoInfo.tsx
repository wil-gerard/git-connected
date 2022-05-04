import { useEffect, useState } from 'react';
import { Octokit } from 'octokit';

export default function GetRepoInfo() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const octokit = new Octokit();
        setLoading(true);
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
          owner: 'wil-gerard',
          repo: 'git-connected',
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}
