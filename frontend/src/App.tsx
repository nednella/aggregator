import { useEffect, useState } from "react";
import type { DashboardData } from "./types";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import ActivityFeed from "./components/ActivityFeed";
import SearchBar from "./components/SearchBar";
import "./App.css";

const DEFAULT_USER = "octocat";

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  function fetchDashboard(username: string) {
    setLoading(true);
    setFetchError(false);
    setData(null);

    fetch(`/api/dashboard/${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<DashboardData>;
      })
      .then(setData)
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchDashboard(DEFAULT_USER);
  }, []);

  const errors = data?.errors ?? [];
  const hasProfileError = errors.some((e) => e.includes("profile"));
  const hasReposError = errors.some((e) => e.includes("repos"));
  const hasActivityError = errors.some((e) => e.includes("events"));

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">DevDash</h1>
        <SearchBar onSearch={fetchDashboard} />
      </header>

      {fetchError && (
        <div className="card error-banner">
          <p className="error-text">
            Failed to load dashboard. Check the username and try again.
          </p>
        </div>
      )}

      <main className="dashboard-grid">
        <ProfileCard
          profile={data?.profile ?? null}
          loading={loading}
          error={hasProfileError}
        />
        <RepoList
          repos={data?.topRepos ?? []}
          loading={loading}
          error={hasReposError}
        />
        <ActivityFeed
          events={data?.recentActivity ?? []}
          loading={loading}
          error={hasActivityError}
        />
      </main>
    </div>
  );
}
